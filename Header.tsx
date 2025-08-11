export default function Header(){
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-xl font-bold">Brine & Vine</a>
        <nav className="flex gap-6 text-sm">
          <a href="/build">Build Your Jar</a>
          <a href="/admin">Admin</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>
    </header>
  )
}
