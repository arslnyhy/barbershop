import Link from "next/link"
import { getServices } from "@/lib/sanity/content"

export const metadata = { title: "Services", description: "Cuts, shaves and considered grooming at CUT / THRU Amsterdam." }

export default async function Services() {
  const items = await getServices()
  return <main className="min-h-screen px-5 py-28 md:px-10"><Link href="/" className="text-xs tracking-[.2em]">← CUT / THRU</Link><p className="mt-24 text-xs uppercase tracking-[.2em] text-copper">The menu</p><h1 className="display mt-4 text-6xl md:text-8xl">Services</h1><div className="mt-16 grid border-t line md:grid-cols-2">{items.map(({ _id, name, description, duration, price }) => <article key={_id} className="border-b line py-8"><div className="flex justify-between gap-5"><div><h2 className="display text-3xl">{name}</h2><p className="mt-3 text-sm text-muted">{description}</p><p className="mt-5 font-mono text-xs uppercase text-muted">{duration}</p></div><p className="text-xl">{price}</p></div><Link href="/" className="mt-6 inline-block text-xs uppercase tracking-widest text-copper underline">Book this service →</Link></article>)}</div></main>
}
