'use client';

import { usePathname } from 'next/navigation';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export default function Layout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang="en">
      <body>
        <div className="layout-wrapper">
          {!isLoginPage && <Header />}
          <main className="main-content">
            {children}
          </main>
          {!isLoginPage && <Footer />}
        </div>
      </body>
    </html>
  );
}
