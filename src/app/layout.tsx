import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./global.css";
import React from "react";

import { CartProvider } from "./components/providers/CartProvider";
import { LanguageProvider } from "./context/LanguageContext";

export default function Layout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en">
      <LanguageProvider>
        <CartProvider>
          <body>
            <div className="layout-wrapper">
              <Header />
              <main className="main-content">{children}</main>
              <Footer />
            </div>
          </body>
        </CartProvider>
      </LanguageProvider>
    </html>
  );
}
