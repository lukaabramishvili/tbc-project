'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CoursesCard from '../components/CoursesCard/CoursesCard';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.warn('Stripe publishable key is missing. Ensure it is set in your .env.local file.');
}

export default function coursesPage() {
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
    <div className='dark:bg-[#1A202C] bg-gray-100 min-h-[calc(100vh-13.5rem)] p-6'>
      <div className='max-w-7xl mx-auto'>
        <header className='mb-12 text-center'>
          <h2 className='text-4xl font-extrabold text-gray-900 dark:text-white mb-3'>
            Explore Our
            <span className='bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent ml-2'>
              Learning Paths
            </span>
          </h2>
          <p className='text-gray-600 dark:text-gray-300 text-lg'>
            Master modern web development with our comprehensive courses
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
          <CoursesCard 
            title="Frontend Development"
            price={9.99}
            description="Master modern frontend development with JavaScript, React, and Next.js"
            onSubscribe={handleSubscription}
            loading={loading}
          />

          <CoursesCard 
            title="Backend Development"
            price={12.99}
            description="Build scalable backend systems with Node.js, Express, and Databases"
            onSubscribe={handleSubscription}
            loading={loading}
          />

          <CoursesCard 
            title="Full Stack Mastery"
            price={19.99}
            description="End-to-end development expertise with full stack projects"
            onSubscribe={handleSubscription}
            loading={loading}
          />
        </div>
      </div>
    </div>  
  );
}
