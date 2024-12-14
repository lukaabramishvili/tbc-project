'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AuthLayout({ children }) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-lg text-gray-700">Loading...</div>
    </div>
  );

  if (user) return <>{children}</>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-black">
      <div className="p-6 bg-white dark:bg-gray-700 dark:shadow-white drop-shadow-sm rounded-lg shadow-lg text-center">
        <h2 className="dark:text-white text-2xl font-semibold mb-4">Please log in to continue</h2>
        <Link 
          href="/api/auth/login" 
          className="text-blue-600 text-lg font-medium hover:underline"
        >
          Click here to login
        </Link>
      </div>
    </div>
  );
}
