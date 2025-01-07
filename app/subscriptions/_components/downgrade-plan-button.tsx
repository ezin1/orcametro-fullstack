"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const DowngradePlanButton = () => {
  const { user } = useUser();

  const handleDowngradePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();

    if (!process.env.NEXT_PUBLIC_STRIPE_PLUBISHABLE_KEY) {
      throw new Error("Stripe publishable key is missing");
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PLUBISHABLE_KEY,
    );

    if (!stripe) {
      throw new Error("Stripe not found");
    }

    await stripe.redirectToCheckout({ sessionId });
  };

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  if (!hasPremiumPlan) {
    return (
      <Button
        className="w-full rounded-full border font-bold"
        onClick={handleDowngradePlanClick}
      >
        Fazer upgrade
      </Button>
    );
  }

  return (
    <Button className="w-full rounded-full border font-bold" variant="link">
      <Link
        href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
      >
        Fazer downgrade
      </Link>
    </Button>
  );
};

export default DowngradePlanButton;
