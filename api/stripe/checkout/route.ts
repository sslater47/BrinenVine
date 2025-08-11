import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { priceWithMargin, type Build } from "@/lib/pricing";

export async function POST(req:NextRequest){
  try{
    const { build } = await req.json();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2024-06-20" });
    const unit = priceWithMargin(build as Build, 0.4);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      line_items: [{
        quantity: build.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(unit*100),
          product_data: {
            name: `Custom Jar — ${build.base}, ${build.cut}, ${build.brine}`,
            description: `Add-ons: ${(build.addOns||[]).join(", ")||"None"}; Size: ${build.jarSize}; Ship: ${build.shipping}`
          }
        }
      }],
      metadata: { build: JSON.stringify(build) },
      shipping_address_collection: { allowed_countries: ["US"] }
    });
    return NextResponse.json({ url: session.url });
  }catch(err:any){
    console.error(err);
    return NextResponse.json({ error: err.message||"Error" }, { status: 500 });
  }
}
