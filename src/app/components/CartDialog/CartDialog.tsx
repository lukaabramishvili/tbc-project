import React from "react";
import { Minus, Plus, X } from "lucide-react"; // Assuming you have these icons available
import { CartItem, useCart } from "../providers/CartProvider";
import { createCheckoutSessionForCart } from "@/app/actions/stripe";
import "./style.css";
import { use } from "chai";
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
      <button className="button" onClick={handleOpen}>
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
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#2C2758] bg-opacity-50 backdrop-blur-md z-40">
          <div
            className="w-3/4 h-3/4 z-50 top-[12.5%] left-[12.5%] fixed pl-10 pr-10 bg-[#2C2758] rounded-xl flex flex-col items-center justify-start"
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
                              className="cursor-pointer border rounded-2xl hover:bg-[#2C2758]"
                              onClick={() =>
                                updateItemQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                            />
                            {item.quantity}
                            <Plus
                              className="cursor-pointer border rounded-2xl hover:bg-[#2C2758]"
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
