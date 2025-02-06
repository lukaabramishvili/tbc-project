"use server";

import { Stripe } from "stripe";
import { CartItem } from "../components/providers/CartProvider";
import { stripe } from "../lib/stripe";

export async function createCheckoutSessionForCart(cartItems: CartItem[]) {
  const session: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      success_url:
        "http://localhost:3000/orders/result?session_id={CHECKOUT_SESSION_ID}",
      line_items: cartItems.map((item) => {
        return {
          quantity: item.quantity,
          price: item.product.stripe_price_id,
        };
      }),
      mode: "payment",
      metadata: {
        cart_items: JSON.stringify(
          cartItems.map((item) => ({
            title: item.product.title,
            product_id: item.product.id,
            quantity: item.quantity,
          }))
        ),
      },
    });

  return {
    client_secret: session.client_secret,
    url: session.url,
  };
}
