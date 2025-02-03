'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { createClient } from '@/utils/supabase/client';

function SuccessContent(): JSX.Element {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const recordSubscription = async () => {
      if (!sessionId) {
        setError('No session ID found.');
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !sessionData?.session) {
        setError('User not authenticated.');
        setLoading(false);
        return;
      }

      const user = sessionData.session.user;
      if (!user) {
        setError('Failed to retrieve user.');
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from('subscriptions').insert({
        user_id: user.id,
        stripe_session_id: sessionId,
        status: 'active',
        created_at: new Date().toISOString(),
      });

      if (insertError) {
        setError(insertError.message);
      }

      setLoading(false);
    };

    recordSubscription();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#2c2758] text-[#7f73eb]">
      <div className="max-w-md w-full p-6 border border-[#2c2758] rounded-lg shadow-lg bg-[#2c2758] dark:bg-white">
        <div className="text-center">
          <h1 className="mt-4 text-2xl font-bold text-white dark:text-[#7f73eb]">
            {loading ? 'Processing...' : error ? 'Error' : 'Success!'}
          </h1>
          <p className="mt-2 text-sm text-white dark:text-gray-500">
            {loading ? 'Saving your course...' : error || 'Your course is active! check your profile for more details.'}
          </p>
        </div>
        <Link href="/home" className="block w-full mt-6 px-4 py-2 text-center text-white bg-[#7f73eb] rounded-md shadow-md hover:bg-[#7f73eb] dark:bg-white dark:text-[#7f73eb] dark:border-[#7f73eb] dark:hover:bg-[#7f73eb]">
          Go back
        </Link>
      </div>
    </div>
  );
}

export default function Success(): JSX.Element {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
