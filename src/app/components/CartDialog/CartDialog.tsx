import React from "react";
import { Minus, Plus, X } from "lucide-react"; // Assuming you have these icons available
import { CartItem, useCart } from "../providers/CartProvider";
import { createCheckoutSessionForCart } from "@/app/actions/stripe";
import "./style.css";
import { useLanguage } from "@/app/context/LanguageContext";

export default function CartDialog() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { cartItems, removeItemFromCart, clearCart, updateItemQuantity } =
    useCart();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  async function handleChekout() {
    if (cartItems.length === 0) {
      console.log("Cart is empty");
      return;
    }

    const { url } = await createCheckoutSessionForCart(cartItems);

    window.location.assign(url as string);
  }

  const { language } = useLanguage();

  return (
    <>
      <button className="button bg-[#7F73EB] dark:bg-gradient-to-r dark:from-purple-500 dark:via-indigo-500 dark:to-blue-500" onClick={handleOpen}>
        <span>
          {language === "eng" ? "Cart Items" : "კალათა"}
        </span>
        <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            id="SVGRepo_tracerCarrier"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <defs> </defs>
            <g id="cart">
              <circle r="1.91" cy="20.59" cx="10.07" className="cls-1"></circle>
              <circle r="1.91" cy="20.59" cx="18.66" className="cls-1"></circle>
              <path
                d="M.52,1.5H3.18a2.87,2.87,0,0,1,2.74,2L9.11,13.91H8.64A2.39,2.39,0,0,0,6.25,16.3h0a2.39,2.39,0,0,0,2.39,2.38h10"
                className="cls-1"
              ></path>
              <polyline
                points="7.21 5.32 22.48 5.32 22.48 7.23 20.57 13.91 9.11 13.91"
                className="cls-1"
              ></polyline>
            </g>
          </g>
        </svg>
        <div>
          <span className="text-white dark:text-gray-200">{cartItems.length}</span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#2C2758] dark:bg-gray-900 bg-opacity-50 backdrop-blur-md z-40 flex items-center justify-center">
          <div
            className="w-full max-w-lg h-auto max-h-[80vh] z-50 p-6 bg-[#2C2758] dark:bg-gray-800 rounded-xl flex flex-col items-center justify-start overflow-y-auto"
            style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="w-full h-16 border-b-2 border-gray-400 dark:border-gray-600 flex flex-row items-center justify-center relative">
              <h2 className="text-lg font-semibold text-white dark:text-gray-200">Your Cart</h2>
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-6 w-6 dark:text-gray-300" />
              </button>
            </div>

            <div className="w-full p-4">
              <ul className="space-y-2">
                {cartItems.length === 0 ? (
                  <li className="text-center text-white dark:text-gray-400">Your cart is empty...</li>
                ) : (
                  cartItems.map((item) => (
                    <li
                      key={item.product.id}
                      className="flex flex-col sm:flex-row items-center justify-between h-auto sm:h-16 border border-gray-200 dark:border-gray-700 p-2 rounded-2xl"
                    >
                      <div className="flex flex-row items-center">
                        <img
                          className="border mr-2 w-10 h-10 object-cover"
                          src={item.product.img_url}
                          alt={item.product.title}
                        />
                        <div className="text-sm sm:text-base text-white dark:text-gray-200">{item.product.title}</div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
                        <div className="text-sm text-white dark:text-gray-300">Price: ${(item.product.price / 100).toFixed(2)}</div>
                        <div className="flex flex-row items-center gap-2 text-white">
                          <Minus
                            className="cursor-pointer border rounded-2xl p-1 text-white hover:bg-[#2C2758] dark:hover:bg-gray-700"
                            onClick={() => updateItemQuantity(item.product.id, item.quantity - 1)}
                          />
                          {item.quantity}
                          <Plus
                            className="cursor-pointer border rounded-2xl p-1 text-white hover:bg-[#2C2758] dark:hover:bg-gray-700"
                            onClick={() => updateItemQuantity(item.product.id, item.quantity + 1)}
                          />
                          <X
                            className="cursor-pointer text-red-500 dark:text-red-400"
                            onClick={() => removeItemFromCart(item.product.id)}
                          />
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
              <div
                onClick={handleChekout}
                className="mt-4 border rounded-2xl w-full max-w-xs bg-green-200 dark:bg-green-700 h-12 flex items-center justify-center cursor-pointer text-center dark:text-gray-200"
              >
                Proceed to Checkout
              </div>
            </div>
          </div>
        </div>
      )}    </>
  );
}
