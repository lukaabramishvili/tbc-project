'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.warn('Stripe publishable key is missing. Ensure it is set in your .env.local file.');
}

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  interface Subscription {
    name: string;
    priceId: string;
    quantity: number;
  }

  const subscription: Subscription = {
    name: 'Product 1',
    priceId: 'price_1QhUNpJjAdwMUhWuUKPxTO43',
    quantity: 1,
  };

  const handleSubscription = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      const response = await fetch('/api/createCheckoutSession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [subscription] }),
      });

      const session = await response.json();
      if (session.error) throw new Error(session.error);

      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
      if (error) console.warn(error.message);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl shadow-lg p-3 bg-[#2c2758] text-gray-500 max-w-xl mx-auto my-20 hover:bg-[#685dcd] transition duration-500">
      <div className="relative flex flex-col items-center p-5 pt-10 bg-white rounded-xl hover:bg-gray-400 hover:text-white transition duration-500">
        <span className="mt-[-12px] absolute top-0 right-0 flex items-center bg-[#2c2758] rounded-l-full py-2 px-3 text-xl font-semibold text-[#7f73eb]">
          $9.99 <small className="text-xs ml-1 text-white">/ month</small>
        </span>
        <p className="text-xl font-semibold text-white bg-[#2c2758] px-2 py-1 rounded-lg">
          Frontend Web Developer
        </p>
        <p className="text-center mt-3">
          The 10-month web programming course will thoroughly teach the students JavaScript, React JS, and Node.js technology.
        </p>
        <div className="w-full flex justify-end mt-6">
          <button
            className="w-full py-3 text-center text-white bg-[#7f73eb] rounded-lg font-medium text-lg hover:bg-[#2c2758] focus:outline-none"
            onClick={handleSubscription}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Subscribe Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
