import React from "react";
import { Minus, Plus, X } from "lucide-react"; // Assuming you have these icons available
import { CartItem, useCart } from "../providers/CartProvider";
import { createCheckoutSessionForCart } from "@/app/actions/stripe";

export default function CartDialog() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { cartItems, removeItemFromCart, clearCart, updateItemQuantity } =
    useCart();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  async function handleChekout() {
    const { url } = await createCheckoutSessionForCart(cartItems);

    window.location.assign(url as string);
  }

  return (
    <>
      <button onClick={handleOpen}>Open Cart</button>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-50 backdrop-blur-md z-40">
          <div
            className="w-3/4 h-3/4 z-50 top-[12.5%] left-[12.5%] fixed pl-10 pr-10 bg-white rounded-xl flex flex-col items-center justify-start"
            style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="w-full h-16 border-b-2 border-gray-400 flex flex-row items-center justify-center">
              <h2>Your Cart</h2>
            </div>
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
              }}
              className="justify-end rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="w-full p-4">
              <ul>
                {cartItems.length === 0 ? (
                  <li>Your cart is empty...</li>
                ) : (
                  cartItems.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex flex-row items-center justify-between h-16 border border-gray-200 p-2 m-2 rounded-2xl"
                    >
                      <div className="flex flex-row">
                        <img
                          className="border mr-2"
                          style={{ width: "30px", height: "30px" }}
                          src={item.product.img_url}
                          alt={item.product.title}
                        />
                        <div className="mr-2">{item.product.title}</div>
                      </div>

                      <div className="flex flex-row gap-2">
                        <div>
                          Price: ${(item.product.price / 100).toFixed(2)}
                        </div>
                        <div className="flex flex-row gap-2">
                          Quantity:
                          <div className="flex flex-row gap-2">
                            <Minus
                              className="cursor-pointer border rounded-2xl hover:bg-slate-200"
                              onClick={() =>
                                updateItemQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                            />
                            {item.quantity}
                            <Plus
                              className="cursor-pointer border rounded-2xl hover:bg-slate-200"
                              onClick={() =>
                                updateItemQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                            />
                            <X
                              className="cursor-pointer"
                              onClick={() =>
                                removeItemFromCart(item.product.id)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
              <div
                onClick={() => handleChekout()}
                className="border rounded-2xl w-40 bg-green-200 h-10 flex flex-col items-center justify-center cursor-pointer"
              >
                Proceed to Checkout
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
