"use client";
import { useEffect, useState } from "react";

export default function Orders(){
  const [rows, setRows] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    fetch("/api/stripe/orders").then(r=>r.json()).then(d=>{ setRows(d.data||[]); setLoading(false); });
  },[]);
  if(loading) return <p>Loading…</p>;
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 pr-4">Created</th>
            <th className="py-2 pr-4">Email</th>
            <th className="py-2 pr-4">Amount</th>
            <th className="py-2 pr-4">Build</th>
            <th className="py-2 pr-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r:any)=>(
            <tr key={r.id} className="border-b">
              <td className="py-2 pr-4">{new Date(r.created*1000).toLocaleString()}</td>
              <td className="py-2 pr-4">{r.customer_details?.email||""}</td>
              <td className="py-2 pr-4">${(r.amount_total/100).toFixed(2)}</td>
              <td className="py-2 pr-4"><code className="text-xs">{r.metadata?.build||""}</code></td>
              <td className="py-2 pr-4">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
