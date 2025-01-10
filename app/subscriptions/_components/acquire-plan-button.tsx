"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import updateUserPlanClerk from "./updateUserPlanClerk";
import { useToast } from "@/app/_hooks/use-toast";

export interface AcquirePlanButtonProps {
  userPlan: string;
  planName: string;
  userId: string;
}

const AcquirePlanButton = ({
  userPlan,
  planName,
  userId,
}: AcquirePlanButtonProps) => {
  const { user } = useUser();
  const { toast } = useToast();

  const handleCancelPlanClick = async () => {
    await updateUserPlanClerk(userId, "");
    toast({
      title: "Sucesso",
      description: "Plano cancelado com sucesso.",
    });
  };

  const handleAcquirePlanClick = async () => {
    const verifyUserPlan = user?.publicMetadata.subscriptionPlan;

    if (verifyUserPlan) {
      toast({
        title: "Erro",
        description:
          "Você já possui um plano, cancele o atual para adquirir um novo.",
      });
      return;
    }

    const result = await createStripeCheckout({ userPlan, planName, userId });
    if (!result) {
      throw new Error("Failed to create Stripe checkout session");
    }
    const { sessionId } = result;

    if (!process.env.NEXT_PUBLIC_STRIPE_PLUBISHABLE_KEY) {
      throw new Error("Stripe publishable key is missing");
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PLUBISHABLE_KEY,
    );

    if (!stripe) {
      throw new Error("Stripe not found");
    }

    await updateUserPlanClerk(userId, planName);
    await stripe.redirectToCheckout({ sessionId });
  };

  const hasUserPlan = user?.publicMetadata.subscriptionPlan === planName;

  if (hasUserPlan) {
    return (
      <Button
        className="w-full rounded-full border font-bold"
        variant="link"
        onClick={handleCancelPlanClick}
      >
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar plano
        </Link>
      </Button>
    );
  }

  return (
    <Button
      className="w-full rounded-full border font-bold text-white"
      onClick={handleAcquirePlanClick}
    >
      Adquirir plano
    </Button>
  );
};

export default AcquirePlanButton;
