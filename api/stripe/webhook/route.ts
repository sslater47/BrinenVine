import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest){
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2024-06-20" });

  let event: Stripe.Event;
  try{
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  }catch(err:any){
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if(event.type === "checkout.session.completed"){
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("Order paid:", session.id, session.metadata?.build);
  }
  return NextResponse.json({ received: true });
}
