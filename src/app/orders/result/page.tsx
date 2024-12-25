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
        console.log(cartItems[0].product_id);
        const lineItems = await stripe.checkout.sessions.listLineItems(
          searchParams.session_id
        );
        lineItems.data.forEach(async (item) => {
          const index = lineItems.data.indexOf(item);
          console.log(cartItems[index]);
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
    <div className="min-h-wrapper ">
      <h2 className="pt-52">
        Successfull Payement, you will be redirected to home page
      </h2>
    </div>
  );
}
