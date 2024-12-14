import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './global.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function Layout({ children }) {

  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div className="layout-wrapper">
            <Header />
            <main className="main-content">
              {children}
            </main>
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
