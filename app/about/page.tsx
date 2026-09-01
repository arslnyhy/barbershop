import Link from "next/link"
import { getSiteSettings } from "@/lib/sanity/content"

export const metadata = { title: "Our story", description: "The story behind CUT / THRU barbershop in Amsterdam." }

export default async function About() {
  const settings = await getSiteSettings()
  return <main className="min-h-screen px-5 py-28 md:px-10"><Link href="/" className="text-xs tracking-[.2em]">← CUT / THRU</Link><div className="mx-auto max-w-4xl py-28"><p className="text-xs uppercase tracking-[.2em] text-copper">{settings.storyEyebrow}</p><h1 className="display mt-5 text-6xl leading-none md:text-9xl">{settings.storyHeading}<br/><em>{settings.storyHeadingEmphasis}</em></h1>{settings.storyParagraphs.map((paragraph, i) => <p key={i} className={`max-w-xl text-lg leading-8 text-muted ${i === 0 ? "mt-12" : "mt-8"}`}>{paragraph}</p>)}</div></main>
}
