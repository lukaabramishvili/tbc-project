'use client'

import { loadStripe } from "@stripe/stripe-js";
 
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);
 
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.warn("Stripe publishable key is missing.");
}

export default async function PricingPagee() {

    interface Subscription {
        name: string;
        priceId: string;
        quantity: number;
      }
       

      const subscription: Subscription = {
        name: "Product 1",
        priceId: "price_1QhUNpJjAdwMUhWuUKPxTO43",
        quantity: 1,
      };

      const basicPlanFormAction = async () => {
        try {
          const stripe = await stripePromise;
          if (!stripe) {
            throw new Error("Stripe failed to initialize");
          }
    
          const response = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ items: [subscription] }),
          });
    
          const session = await response.json();
    
          if (session.error) {
            console.error(session.error);
            throw new Error(session.error);
          }
    
          const { error } = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
    
          if (error) {
            console.warn(error.message);
          }
        } catch (error) {
          console.error("Checkout error:", error);
        } 
      };

      function Products() {
        console.log("Products");
      }
      

    return (
        <main className="max-w-[136rem] mx-auto p-8 flex flex-col justify-center items-center gap-8">
            <h1 className="text-3xl">pricing</h1>
            <p className="text-red-600">
            You must be logged in to view your pricing.
            </p>
            <button onClick={basicPlanFormAction} className="p4 bg-blue-600">button</button>
        </main>
    );
}
