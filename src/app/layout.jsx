import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './global.css';

export default function Layout({ children }) {

  return (
    <html lang="en">
      <body>
        <div className="layout-wrapper">
          <Header />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
