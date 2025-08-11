export default function Footer(){
  return (
    <footer className="border-t mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-gray-600">
        <div className="flex items-center justify-between">
          <p>© {new Date().getFullYear()} Brine & Vine. All rights reserved.</p>
          <p>Made fresh in the USA.</p>
        </div>
      </div>
    </footer>
  )
}
