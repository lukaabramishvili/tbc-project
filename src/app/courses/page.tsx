'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CoursesCard from '../components/CoursesCard/CoursesCard';
import { useLanguage } from '../context/LanguageContext';

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

  const { language } = useLanguage()

  return (
    <div className="dark:bg-[#1A202C] bg-gray-100 min-h-[calc(100vh-13.5rem)] p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            {language === 'eng' ? 'Explore Our' : 'აღმოაჩინე ჩვენი'}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent ml-2">
              {language === 'eng' ? 'Learning Paths' : 'სასწავლო ბილიკი'}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
            {language === 'eng' ? 'Master modern web development with our comprehensive courses' : 'დაეუფლეთ თანამედროვე web development-ს ჩვენი ყოვლისმომცველი კურსებით'}
          </p>
        </header>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8">
          <CoursesCard 
            title="Frontend Development"
            price={9.99}
            description={language === 'eng' ? 'Master modern frontend development with JavaScript, React, and Next.js' : 'დაეუფლეთ თანამედროვე frontend development-ს JavaScript-ით, React-ით და Next.js-ით'}
            onSubscribe={handleSubscription}
            loading={loading}
          />
  
          <div className="relative cursor-not-allowed hover:opacity-50 group">
            <h3 className="absolute inset-0 flex items-center justify-center z-10 text-lg sm:text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {language === 'eng' ? 'COMING SOON' : 'მალე'}
            </h3>
            <div className="pointer-events-none">
              <CoursesCard 
                title="Backend Development"
                price={12.99}
                description={language === 'eng' ? 'Build scalable backend systems with Node.js, Express, and Databases' : 'შექმენით მასშტაბირებადი backend სისტემები Node.js, Express და Databases'}
                onSubscribe={handleSubscription}
                loading={loading}
              />
            </div>
          </div>
  
          <div className="relative cursor-not-allowed hover:opacity-50 group">
            <h3 className="absolute inset-0 flex items-center justify-center z-10 text-lg sm:text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {language === 'eng' ? 'COMING SOON' : 'მალე'}
            </h3>
            <div className="pointer-events-none">
              <CoursesCard 
                title="Full Stack Mastery"
                price={19.99}
                description={language === 'eng' ? 'End-to-end development expertise with full stack projects. (frontend + backend)' : 'End-to-end development expertise სრული სტეკის პროექტებით. (frontend + backend)'}
                onSubscribe={handleSubscription}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
