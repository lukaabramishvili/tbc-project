// import { createClient } from "@/utils/supabase/server";
// import { loadStripe } from "@stripe/stripe-js";
 
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
// );
 
// if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
//   console.warn("Stripe publishable key is missing.");
// }
 

// export default async function PricingPage() {

//         const supabase = await createClient();
    
//         const { data: userData, error: userError } = await supabase.auth.getUser();
//         const user = userData?.user;
    
//         if (userError || !user) {
//             console.error("Error fetching user:", userError?.message);
//             return (
//             <main className="max-w-[136rem] mx-auto p-8 flex flex-col justify-center items-center gap-8">
//                 <h1 className="text-3xl">pricing</h1>
//                 <p className="text-red-600">
//                 You must be logged in to view your pricing.
//                 </p>
//             </main>
//             );
//         }
    
//         let { data: pricing, error } = await supabase
//         .from('pricing')
//         .select('*')
                  
//         const sortedPricing = pricing?.sort((a, b) => {
//             const dateA = new Date(a.created_at);
//             const dateB = new Date(b.created_at);
//             return dateB.getTime() - dateA.getTime();
//         });
    
//         if (error) {
//             console.error("Error fetching pricing:", error.message);
//         }

//         // 1111111111111111

//         interface Subscription {
//           name: string;
//           priceId: string;
//           quantity: number;
//         }
         

//         const subscription: Subscription = {
//           name: "Product 1",
//           priceId: "price_1QhUNpJjAdwMUhWuUKPxTO43",
//           quantity: 1,
//         };
 
//         const basicPlanFormAction = async () => {
//           try {
//             const stripe = await stripePromise;
//             if (!stripe) {
//               throw new Error("Stripe failed to initialize");
//             }
      
//             const response = await fetch("/api/create-checkout-session", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ items: [subscription] }),
//             });
      
//             const session = await response.json();
      
//             if (session.error) {
//               console.error(session.error);
//               throw new Error(session.error);
//             }
      
//             const { error } = await stripe.redirectToCheckout({
//               sessionId: session.id,
//             });
      
//             if (error) {
//               console.warn(error.message);
//             }
//           } catch (error) {
//             console.error("Checkout error:", error);
//           } 
//         };

//         function Products() {
//           console.log("Products");
//         }

//   return (
//     <section className="max-w-[136rem] mx-auto p-8 flex flex-col justify-center items-center gap-12">
//     <h1 className="text-4xl font-bold text-gray-800">Your Courses</h1>

//     {sortedPricing && sortedPricing.length > 0 ? (
//       <ul className="flex flex-col gap-2 w-full max-w-4xl space-y-6">
//         {sortedPricing.map((pricing) => (
//             <li className="list-none border border-gray-300 bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                 <div>
//                   <p className="text-lg font-semibold text-gray-700">
//                     <strong>pricing ID:</strong> {pricing.id}
//                   </p>
//                   <p className="text-lg text-gray-600">
//                     <strong>Product ID:</strong> {pricing.product_id}
//                   </p>
//                   <p className="text-lg text-gray-600">
//                     <strong>Price:</strong> $
//                     {new Intl.NumberFormat("en-US").format(pricing.price)}
//                   </p>
//                 </div>
//                 <div className="flex flex-col items-center gap-4 mt-4 md:mt-0">
//                     <div className="flex gap-4 mt-4 md:mt-0">
//                         <p className="text-sm text-gray-500 mt-4 md:mt-0">
//                         <strong>Date:</strong> {pricing.created_at}
//                         </p>
//                         <p className="text-sm text-gray-500 mt-4 md:mt-0">
//                         <strong>view</strong> {pricing.view}
//                         </p>
//                     </div>
//                     <button onClick={Products} className="flex items-center justify-center p-4 bg-green-600 rounded-xl text-white">
//                         <strong>Subscribe Now</strong>
//                     </button>
//                 </div>
//               </div>
//             </li>
//         ))}
//       </ul>
//     ) : (
//       <p className="text-gray-500 text-lg">You have no courses yet.</p>
//     )}
//   </section>
// );
// }