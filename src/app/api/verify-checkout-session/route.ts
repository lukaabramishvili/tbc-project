import { stripe } from "@/app/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const sessionId = body.sessionId;

    if (!sessionId) {
      return NextResponse.json({ valid: false, error: "No session ID provided" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid" || session.status === "complete") {
      return NextResponse.json({ valid: true });
    } else {
      return NextResponse.json({ valid: false });
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    return NextResponse.json({ valid: false, error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
