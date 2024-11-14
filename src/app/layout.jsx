'use client';

import { usePathname } from 'next/navigation';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export function ClientSideWrapper({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/Login';

  return (
    <>
      {!isLoginPage && <Header />}
      <div className="main-children">
        {children}
      </div>
      {!isLoginPage && <Footer />}
    </>
  );
}
