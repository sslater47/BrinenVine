import Link from "next/link";

export default function HomePage(){
  return (
    <section className="grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-4xl font-extrabold leading-tight">Craft your perfect jar with <span className="text-[var(--brand)]">Brine & Vine</span>.</h1>
        <p className="mt-4 text-gray-600">Choose your veg, cut, brine, and add‑ons. We route your order to our farm & co‑packer partners who pickle and ship to you.</p>
        <div className="mt-6 flex gap-3">
          <Link className="btn-primary" href="/build">Build Your Jar</Link>
          <a className="btn bg-gray-100" href="#faq">Learn more</a>
        </div>
      </div>
      <div className="card">
        <ol className="space-y-3 text-sm">
          <li><strong>1. You build it</strong> — customize your jar.</li>
          <li><strong>2. We route it</strong> — order → farm/co‑packer.</li>
          <li><strong>3. They pickle</strong> — jar is made to spec.</li>
          <li><strong>4. You enjoy</strong> — shipped to your door.</li>
        </ol>
      </div>

      <div id="faq" className="md:col-span-2 mt-10 card">
        <h2 className="text-xl font-bold mb-4">FAQ</h2>
        <details className="mb-3"><summary className="font-semibold">How long does it take?</summary><p className="mt-2 text-gray-600">Typical production 3‑7 business days plus shipping.</p></details>
        <details className="mb-3"><summary className="font-semibold">Are jars shelf‑stable?</summary><p className="mt-2 text-gray-600">Yes, when labeled shelf‑stable. Some builds may be refrigerated—your checkout page will state which.</p></details>
        <details><summary className="font-semibold">What about allergens?</summary><p className="mt-2 text-gray-600">We list ingredients on label; facility handles common spices & produce.</p></details>
      </div>
    </section>
  )
}
