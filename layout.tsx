import "./../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Brine & Vine — Custom Pickles",
  description: "Build-your-own artisanal pickled jars shipped to your door.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
