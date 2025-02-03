import { NextResponse } from 'next/server';
import { stripe } from '../../lib/stripe';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request): Promise<Response> {
  const supabase = createClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
    const customer = await stripe.customers.create({ email: user.email });
    const { items } = await req.json();
    const transformedItems = items.map((item: { priceId: string; quantity: number }) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
    const formattedSiteUrl = siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: transformedItems,
      mode: 'subscription',
      customer: customer.id,
      success_url: `${formattedSiteUrl}/courses/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${formattedSiteUrl}/courses`,
    });

    const { error } = await (await supabase)
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
