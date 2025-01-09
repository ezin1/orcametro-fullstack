"use server";

import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { AcquirePlanButtonProps } from "../_components/acquire-plan-button";

export const createStripeCheckout = async ({
  planName,
}: AcquirePlanButtonProps) => {
  const { userId } = await auth();
  console.log(planName);
  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is missing");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
  });

  if (planName === "Basic") {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      success_url: process.env.APP_URL,
      cancel_url: process.env.APP_URL,
      subscription_data: {
        metadata: {
          clerk_user_id: userId,
        },
      },
      line_items: [
        {
          price: process.env.STRIPE_BASIC_PLAN_PRICE_ID,
          quantity: 1,
        },
      ],
    });

    return { sessionId: session.id };
  } else if (planName === "Standard") {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      success_url: process.env.APP_URL,
      cancel_url: process.env.APP_URL,
      subscription_data: {
        metadata: {
          clerk_user_id: userId,
        },
      },
      line_items: [
        {
          price: process.env.STRIPE_STANDARD_PLAN_PRICE_ID,
          quantity: 1,
        },
      ],
    });

    return { sessionId: session.id };
  } else if (planName === "Premium") {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      success_url: process.env.APP_URL,
      cancel_url: process.env.APP_URL,
      subscription_data: {
        metadata: {
          clerk_user_id: userId,
        },
      },
      line_items: [
        {
          price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
          quantity: 1,
        },
      ],
    });

    return { sessionId: session.id };
  }
};
