import { stripe } from "@/app/lib/stripe";
import { createClient } from "@/utils/supabase/server";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (searchParams.session_id) {
    const session = await stripe.checkout.sessions.retrieve(
      searchParams.session_id
    );
    if (session.status === "complete") {
      if (session.metadata) {
        const cartItems = JSON.parse(session.metadata.cart_items);

        const lineItems = await stripe.checkout.sessions.listLineItems(
          searchParams.session_id
        );
        lineItems.data.forEach(async (item) => {
          const index = lineItems.data.indexOf(item);

          const { data, error } = await supabase.from("orders").insert({
            stripe_product_id: item.price?.product,
            stripe_price_id: item.price?.id,
            user_id: user?.id,
            price: item.price?.unit_amount_decimal,
            product_id: cartItems[index].product_id,
            stripe_purchase_id: session.payment_intent,
          });
          console.log(data, error, index);
        });
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful! 🎉
      </h2>
      <p className="text-lg text-gray-700">
        Thank you for your purchase. You will be redirected to the home page
        shortly.
      </p>
      <p className="text-sm text-gray-500 mt-2">
        If you are not redirected automatically, click{" "}
        <a href="/" className="text-slate-600 underline">
          here
        </a>
        .
      </p>
    </div>
  );
}
