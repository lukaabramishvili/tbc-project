import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./global.css";
import React from "react";

import { CartProvider } from "./components/providers/CartProvider";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <CartProvider>
        <body>
          {" "}
          <div className="layout-wrapper">
            <Header />
            <main className="main-content">{children}</main>
            <Footer />
          </div>
        </body>
      </CartProvider>
    </html>
  );
}
