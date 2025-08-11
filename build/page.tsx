import dynamic from "next/dynamic";
const JarBuilder = dynamic(()=>import("@/components/JarBuilder"), { ssr:false });
export default function Build(){
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Build Your Jar</h1>
      <JarBuilder />
    </section>
  )
}
