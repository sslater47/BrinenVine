import Orders from "./table";
export const dynamic = "force-dynamic";
export default function Admin(){
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Admin</h1>
      <Orders />
    </section>
  )
}
