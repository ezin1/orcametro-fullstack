"use client";

import { Button } from "@/app/_components/ui/button";
import {
  cancelUserSubscription,
  createStripeCheckout,
} from "../create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import updateUserPlanClerk from "./updateUserPlanClerk";
import { useToast } from "@/app/_hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [cancelIsLoading, setCancelIsLoading] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();

  const handleCancelPlanClick = async () => {
    setCancelIsLoading(true);
    const result = await cancelUserSubscription(userId);
    if (!result) {
      throw new Error("Failed to cancel subscription");
    }

    setTimeout(() => {
      setCancelIsLoading(false);
    }, 5000);

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

    toast({
      title: "Sucesso",
      description: "Plano contratado com sucesso.",
    });
  };

  const hasUserPlan = user?.publicMetadata.subscriptionPlan === planName;

  useEffect(() => {
    if (cancelIsLoading) {
      toast({
        title: "Cancelando plano",
        description: "Aguarde um momento...",
      });
    }
  }, [cancelIsLoading, toast]);

  if (hasUserPlan) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="w-full rounded-full border font-bold"
            variant="link"
          >
            Gerenciar plano
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você deseja realmente cancelar seu plano?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelPlanClick}
              className="primary text-white"
            >
              Encerrar assinatura
              {cancelIsLoading && <Loader2Icon className="animate-spin" />}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
