"use client";
import { useState, useMemo } from "react";
import { priceWithMargin, unitCost, type Build } from "@/lib/pricing";
import clsx from "clsx";

export default function JarBuilder(){
  const [build, setBuild] = useState<Build>({
    base:"cucumber", cut:"spears", brine:"classic", addOns:[], jarSize:"16oz", shipping:"standard", quantity:1
  });
  const retail = useMemo(()=>priceWithMargin(build, 0.4),[build]);
  const cost = useMemo(()=>unitCost(build),[build]);
  const total = +(retail*build.quantity).toFixed(2);

  function update<K extends keyof Build>(k:K,v:Build[K]){
    setBuild(b=>({...b,[k]:v}));
  }
  function toggleAddon(a:Build["addOns"][number]){
    setBuild(b=>({...b, addOns: b.addOns.includes(a) ? b.addOns.filter(x=>x!==a) : [...b.addOns, a]}));
  }

  async function checkout(){
    const res = await fetch("/api/stripe/checkout",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ build })
    });
    const data = await res.json();
    if(data.url) window.location.href = data.url;
    else alert(data.error || "Checkout error");
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Customize</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Base">
            <Select value={build.base} onChange={e=>update("base", e.target.value as any)} options={[
              ["cucumber","Cucumber"],["green-bean","Green Bean"],["carrot","Carrot"],["mixed","Mixed Veg"]
            ]}/>
          </Field>
          <Field label="Cut">
            <Select value={build.cut} onChange={e=>update("cut", e.target.value as any)} options={[
              ["spears","Spears"],["chips","Chips"],["whole","Whole"]
            ]}/>
          </Field>
          <Field label="Brine">
            <Select value={build.brine} onChange={e=>update("brine", e.target.value as any)} options={[
              ["classic","Classic"],["garlic-dill","Garlic Dill"],["spicy","Spicy"],["sweet-heat","Sweet Heat"]
            ]}/>
          </Field>
          <Field label="Jar Size">
            <Select value={build.jarSize} onChange={e=>update("jarSize", e.target.value as any)} options={[
              ["8oz","8 oz"],["16oz","16 oz"],["24oz","24 oz"]
            ]}/>
          </Field>
          <Field label="Shipping">
            <Select value={build.shipping} onChange={e=>update("shipping", e.target.value as any)} options={[
              ["standard","Standard"],["express","Express"]
            ]}/>
          </Field>
          <Field label="Quantity">
            <input className="field" type="number" min={1} value={build.quantity} onChange={e=>update("quantity", Math.max(1, Number(e.target.value)) as any)} />
          </Field>
        </div>
        <div className="mt-4">
          <span className="label">Add-ons</span>
          <div className="flex flex-wrap gap-2">
            {["onion","jalapeno","peppercorn","dill","mustard-seed"].map(a=>(
              <button key={a} onClick={()=>toggleAddon(a as any)} className={clsx("btn", build.addOns.includes(a as any) ? "bg-gray-900 text-white" : "bg-gray-100")}>
                {a.replace("-"," ").titleCase?.() || a.replace("-"," ").replace(/\b\w/g, m=>m.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Summary</h2>
        <ul className="text-sm space-y-1">
          <li><strong>Retail per jar:</strong> ${retail}</li>
          <li><strong>Estimated unit cost:</strong> ${cost}</li>
          <li><strong>Margin per jar:</strong> ${(retail-cost).toFixed(2)} (~40%)</li>
        </ul>
        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">${total}</p>
            <p className="text-xs text-gray-500">Total for {build.quantity} jar(s)</p>
          </div>
          <button onClick={checkout} className="btn-primary">Checkout</button>
        </div>
        <p className="mt-4 text-xs text-gray-500">Prices auto-calc from your build. Final shipping/tax at checkout.</p>
      </div>
    </div>
  )
}

function Field({label, children}:{label:string,children:any}){
  return (<label className="block">
    <span className="label">{label}</span>
    {children}
  </label>)
}
function Select({value,onChange,options}:{value:string,onChange:any,options:[string,string][]}){
  return <select className="field" value={value} onChange={onChange}>{options.map(([v,l])=>(<option key={v} value={v}>{l}</option>))}</select>
}
