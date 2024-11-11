'use client';

import './global.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { usePathname } from 'next/navigation';
import { UserDataProvider } from './providers/UserDataProvider';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/Login';

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <UserProvider>
        <body>
          <UserDataProvider>
            <div id="root">
              <div className="application">
                {!isLoginPage && <Header />}
                <div className="main-children">
                  {children}
                </div>
                {!isLoginPage && <Footer />}
              </div>
            </div>
          </UserDataProvider>
        </body>
      </UserProvider>
    </html>
  );
}
