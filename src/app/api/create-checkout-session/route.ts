import { NextResponse } from 'next/server';
import { stripe } from '../../lib/stripe';
import { createClient } from "@/utils/supabase/server";
 
export async function POST(req: Request): Promise<Response> {
  const supabase = await createClient();
 
  const {
    data: { user },
  } = await supabase.auth.getUser();
 
  const customer = await stripe.customers.create({
    email: user?.email,
  });
 
  try {
    const {
      items,
    }: { items: { name: string; priceId: string; quantity: number }[] } =
      await req.json();
    const transformedItems = items.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));
 
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedItems,
      mode: "subscription",
      customer: customer.id,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    });
 
    const { error } = await supabase
      .from("user_profiles")
      .upsert({ id: user?.id, stripe_customer_id: customer.id });
 
    if (error) {
      throw new Error("Failed to update user profile with Stripe customer ID");
    }
 
    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
 