'use client';

import './Login.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Login() {
  const { user, error, isLoading } = useUser();

  const router = useRouter();

  return (
    <main>
      <div className="login">
        <>
          <form className="login-form">
            {!user ? (
              <>
                <h1>{('authenticate')}.</h1>

                <button type="submit" className="btn-login">
                  <a href="/api/auth/login">{('login')}</a>
                </button>
              </>
            ) : (
              <>
                <h1 className="login-authenticated">
                  You Are Already Authenticated!
                </h1>
                <button style={{ color: 'white', textDecoration: 'underline' }}>
                  <Link href="/">Navigate To Home Page</Link>
                </button>
              </>
            )}
          </form>
        </>
      </div>
    </main>
  );
}
