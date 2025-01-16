'use client'

import { loadStripe } from "@stripe/stripe-js";
 
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
);
 
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.warn("Stripe publishable key is missing.");
}

export default async function PricingPagee() {

    interface Subscription {
        name: string;
        priceId: string;
        quantity: number;
      }
       

      const subscription: Subscription = {
        name: "Product 1",
        priceId: "price_1QhUNpJjAdwMUhWuUKPxTO43",
        quantity: 1,
      };

      const basicPlanFormAction = async () => {
        try {
          const stripe = await stripePromise;
          if (!stripe) {
            throw new Error("Stripe failed to initialize");
          }
    
          const response = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ items: [subscription] }),
          });
    
          const session = await response.json();
    
          if (session.error) {
            console.error(session.error);
            throw new Error(session.error);
          }
    
          const { error } = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
    
          if (error) {
            console.warn(error.message);
          }
        } catch (error) {
          console.error("Checkout error:", error);
        } 
      };

      function Products() {
        console.log("Products");
      }
      

    return (
      <div className="rounded-2xl shadow-lg p-3 bg-[#2c2758] text-gray-500 max-w-xl mx-auto my-20 hover:bg-[#685dcd] transition duration-500">
        <div className="relative flex flex-col items-center p-5 pt-10 bg-white rounded-xl hover:bg-gray-400 hover:text-white transition duration-500">
          <span className="mt-[-12px] absolute top-0 right-0 flex items-center bg-[#2c2758] rounded-l-full py-2 px-3 text-xl font-semibold text-[#7f73eb]">
            $9.99 <small className="text-xs ml-1 text-white">/ month</small>
          </span>
          <p className="text-xl font-semibold text-white bg-[#2c2758] px-2 py-1 rounded-lg">
            Frontend Web Developer
          </p>
          <p className="text-center mt-3">
            The 10-month web programming course will thoroughly teach the students JavaScript,
            React JS and Node js technology, which is necessary for independently building
            and functionally debugging websites, as well as for programming http web servers.
            In addition, within the course, the student will master such areas as:.
          </p>
          <ul className="flex flex-col space-y-3 mt-4">
            <li className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-5 h-5 bg-[#7f73eb] text-white rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span><strong className="font-semibold text-[#7f73eb]"> Independently reviewing the design and assembling its markup</strong></span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-5 h-5 bg-[#7f73eb] text-white rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span><strong className="font-semibold text-[#7f73eb]">Adding features and building sites dynamically</strong></span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-5 h-5 bg-[#7f73eb] text-white rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span><strong className="font-semibold text-[#7f73eb]">Building any site with React js</strong></span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-5 h-5 bg-[#7f73eb] text-white rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span><strong className="font-semibold text-[#7f73eb]">Code writing practices</strong></span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-5 h-5 bg-[#7f73eb] text-white rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span><strong className="font-semibold text-[#7f73eb]">Working with databases</strong></span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-5 h-5 bg-[#7f73eb] text-white rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span><strong className="font-semibold text-[#7f73eb]">Integration of Next js framework</strong></span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="flex items-center justify-center w-5 h-5 bg-[#7f73eb] text-white rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span><strong className="font-semibold text-[#7f73eb]">testing and more</strong></span>
            </li>

          </ul>
          <div className="w-full flex justify-end mt-6">
            <a
              className="w-full py-3 text-center text-white bg-[#7f73eb] rounded-lg font-medium text-lg hover:bg-[#2c2758] focus:outline-none"
              href="#"
            >
              <button onClick={basicPlanFormAction}>
                Subscribe Now
              </button>
            </a>
          </div>
        </div>
      </div>
    );
}


