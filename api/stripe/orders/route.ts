import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function GET(){
  try{
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2024-06-20" });
    const sessions = await stripe.checkout.sessions.list({ limit: 20 });
    return NextResponse.json({ data: sessions.data });
  }catch(err:any){
    return NextResponse.json({ error: err.message||"Error" }, { status: 500 });
  }
}
