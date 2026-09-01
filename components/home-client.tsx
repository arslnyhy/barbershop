"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, CalendarDays, MapPin, Menu, Phone, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Barber, Service, SiteSettings, Testimonial } from "@/lib/sanity/types"

type Props = {
  settings: SiteSettings
  services: Service[]
  barbers: Barber[]
  testimonials: Testimonial[]
}

export function HomeClient({ settings, services, barbers, testimonials }: Props) {
  const [menu, setMenu] = useState(false)
  const [booking, setBooking] = useState(false)
  const [sent, setSent] = useState(false)
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const [form, setForm] = useState({
    service: services[0]?.name ?? "",
    barber: barbers[0]?.name ?? "Any available barber",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  function updateForm<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function resetBookingForm() {
    setSent(false)
    setSubmitError("")
    setSaving(false)
    setForm({
      service: services[0]?.name ?? "",
      barber: barbers[0]?.name ?? "Any available barber",
      date: "",
      time: "",
      name: "",
      email: "",
      phone: "",
      notes: "",
    })
  }

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError("")

    const supabase = createClient()
    if (!supabase) {
      setSubmitError("Supabase is not configured yet.")
      return
    }

    if (!form.service || !form.name || !form.email || !form.phone || !form.date || !form.time) {
      setSubmitError("Please complete all required fields.")
      return
    }

    setSaving(true)
    const { error } = await supabase.from("bookings").insert({
      service: form.service,
      barber: form.barber || "Any available barber",
      booking_date: form.date,
      booking_time: form.time,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      notes: form.notes || null,
    })
    setSaving(false)

    if (error) {
      setSubmitError("We couldn’t save your appointment. Please try again.")
      return
    }

    setSent(true)
  }

  return (
    <main>
      <header className="fixed top-0 z-20 flex w-full items-center justify-between px-5 py-5 mix-blend-difference text-paper md:px-10">
        <a href="#top" className="text-sm font-bold tracking-[.28em]">
          {settings.shopName}
        </a>
        <nav className="hidden items-center gap-8 text-xs uppercase tracking-[.16em] md:flex">
          <a href="#services">Services</a>
          <a href="#barbers">Barbers</a>
          <a href="#story">Our story</a>
          <a href="#visit">Visit</a>
        </nav>
        <button aria-label="Open menu" onClick={() => setMenu(!menu)} className="md:hidden">
          <Menu size={22} />
        </button>
        <button
          onClick={() => setBooking(true)}
          className="hidden border border-paper/50 px-4 py-2 text-xs uppercase tracking-[.16em] transition hover:bg-paper hover:text-ink md:block"
        >
          Book now
        </button>
      </header>

      {menu && (
        <div className="fixed inset-0 z-10 flex flex-col justify-center gap-7 bg-ink px-6 text-4xl display md:hidden">
          <button className="absolute right-5 top-5" onClick={() => setMenu(false)}>
            <X />
          </button>
          <a href="#services" onClick={() => setMenu(false)}>
            Services
          </a>
          <a href="#barbers" onClick={() => setMenu(false)}>
            Barbers
          </a>
          <a href="#story" onClick={() => setMenu(false)}>
            Our story
          </a>
          <a href="#visit" onClick={() => setMenu(false)}>
            Visit
          </a>
        </div>
      )}

      <section id="top" className="film flex min-h-[90vh] flex-col justify-end px-5 pb-12 pt-32 md:min-h-screen md:px-10 md:pb-16">
        <div className="max-w-5xl">
          <p className="mb-5 text-xs uppercase tracking-[.25em] text-paper/70">{settings.tagline}</p>
          <h1 className="display max-w-4xl text-[clamp(4rem,12vw,10rem)] leading-[.86] tracking-[-.05em]">
            {settings.heroHeading}
            <br />
            <em>{settings.heroHeadingEmphasis}</em>
          </h1>
          <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xs text-sm leading-6 text-paper/75">{settings.heroDescription}</p>
            <button
              onClick={() => setBooking(true)}
              className="flex w-fit items-center gap-8 bg-copper px-5 py-4 text-xs font-bold uppercase tracking-[.15em] text-ink"
            >
              Book an appointment <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="paper px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-24">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-copper">{settings.introEyebrow}</p>
          <div>
            <h2 className="display text-4xl leading-tight md:text-6xl">
              {settings.introHeading}
              <br />
              <em>{settings.introHeadingEmphasis}</em>
            </h2>
            <p className="mt-8 max-w-md text-base leading-7 text-ink/70">{settings.introText}</p>
            <a href="#story" className="mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.15em] underline underline-offset-8">
              Get to know us <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="px-5 py-20 md:px-10 md:py-28">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[.2em] text-copper">What we do</p>
            <h2 className="display text-5xl md:text-7xl">The menu</h2>
          </div>
          <a href="/services" className="hidden text-xs uppercase tracking-[.15em] underline underline-offset-8 md:block">
            All services
          </a>
        </div>
        <div className="grid border-t line md:grid-cols-2">
          {services.map(({ _id, name, description, duration, price }) => (
            <div key={_id} className="flex items-end justify-between gap-4 border-b line py-7">
              <div>
                <h3 className="display text-2xl">{name}</h3>
                <p className="mt-2 text-sm text-muted">{description}</p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted">{duration}</p>
              </div>
              <div className="text-right">
                <p className="text-xl">{price}</p>
                <button onClick={() => setBooking(true)} className="mt-4 text-[11px] uppercase tracking-widest text-copper underline underline-offset-4">
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="barbers" className="paper px-5 py-20 md:px-10 md:py-28">
        <p className="mb-4 text-xs uppercase tracking-[.2em] text-copper">The people</p>
        <h2 className="display mb-12 text-5xl md:text-7xl">Meet your barber</h2>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {barbers.map(({ _id, name, specialty, bio, photoUrl }) => (
            <article key={_id}>
              <div
                className="mb-5 aspect-[.78] bg-neutral-300 bg-cover bg-center grayscale"
                style={photoUrl ? { backgroundImage: `url(${photoUrl})` } : undefined}
              />
              <p className="text-[10px] font-bold tracking-[.18em] text-copper">{specialty}</p>
              <h3 className="display mt-2 text-2xl">{name}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/65">{bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="story" className="grid md:grid-cols-2">
        <div className="min-h-[420px] bg-[url(https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=85)] bg-cover bg-center" />
        <div className="flex flex-col justify-center px-5 py-20 md:px-16">
          <p className="mb-5 text-xs uppercase tracking-[.2em] text-copper">{settings.storyEyebrow}</p>
          <h2 className="display text-5xl leading-none md:text-7xl">
            {settings.storyHeading}
            <br />
            <em>{settings.storyHeadingEmphasis}</em>
          </h2>
          <p className="mt-8 max-w-md leading-7 text-paper/65">{settings.storyParagraphs[0]}</p>
        </div>
      </section>

      <section className="paper px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-3">
          {testimonials.map(({ _id, quote, author }) => (
            <figure key={_id} className="border-t border-ink/20 pt-6">
              <blockquote className="display text-2xl leading-tight">{quote}</blockquote>
              <figcaption className="mt-7 text-[10px] font-bold tracking-[.18em] text-copper">{author}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="visit" className="grid paper md:grid-cols-2">
        <div className="p-5 py-20 md:p-16">
          <p className="mb-5 text-xs uppercase tracking-[.2em] text-copper">Find us</p>
          <h2 className="display text-5xl md:text-7xl">Come through.</h2>
          <div className="mt-12 grid gap-8 text-sm md:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-ink/45">Address</p>
              <p>
                {settings.address.line1}
                <br />
                {settings.address.line2}
              </p>
              <a className="mt-3 inline-block underline" href={settings.directionsUrl}>
                Get directions <ArrowRight size={14} className="inline" />
              </a>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-ink/45">Opening hours</p>
              <p>
                {settings.openingHours.map(({ days, hours }, i) => (
                  <span key={days}>
                    {days} · {hours}
                    {i < settings.openingHours.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className="min-h-[330px] bg-[#d8d1c3] p-5 text-ink/50 md:p-10">
          <div className="flex h-full items-end justify-between border border-ink/20 p-5">
            <span className="text-xs uppercase tracking-widest">{settings.coordinatesLabel}</span>
            <MapPin />
          </div>
        </div>
      </section>

      <section className="px-5 py-24 text-center md:py-36">
        <p className="mb-5 text-xs uppercase tracking-[.2em] text-copper">{settings.closingEyebrow}</p>
        <h2 className="display mx-auto max-w-3xl text-6xl leading-[.9] md:text-8xl">
          {settings.closingHeading}
          <br />
          <em>{settings.closingHeadingEmphasis}</em>
        </h2>
        <button onClick={() => setBooking(true)} className="mt-10 inline-flex items-center gap-8 bg-copper px-6 py-4 text-xs font-bold uppercase tracking-[.15em] text-ink">
          Book an appointment <CalendarDays size={16} />
        </button>
      </section>

      <footer className="flex flex-col justify-between gap-8 border-t line px-5 py-8 text-xs text-muted md:flex-row md:px-10">
        <p className="font-bold tracking-[.2em] text-paper">{settings.shopName}</p>
        <p>{settings.address.line1} · Amsterdam</p>
        <div className="flex gap-5">
          <a href={`tel:${settings.phone}`}>
            <Phone size={15} />
          </a>
          <a href="#top" aria-label="Back to top">
            Top
          </a>
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
        </div>
      </footer>

      {booking && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-ink/80 p-0 backdrop-blur-sm md:items-center md:p-6">
          <div role="dialog" aria-modal="true" aria-labelledby="booking-title" className="paper w-full max-w-lg p-6 md:p-10">
            {sent ? (
              <div className="py-10 text-center">
                <p className="text-xs uppercase tracking-widest text-copper">You’re all set</p>
                <h2 className="display mt-4 text-5xl">See you in the chair.</h2>
                <p className="mt-5 text-sm text-ink/65">Your booking reference is <strong>CT-2408</strong>.</p>
                <button
                  onClick={() => {
                    setBooking(false)
                    resetBookingForm()
                  }}
                  className="mt-8 border border-ink px-5 py-3 text-xs uppercase tracking-widest"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submitBooking}>
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-copper">Quick booking</p>
                    <h2 id="booking-title" className="display mt-2 text-4xl">
                      Reserve your chair.
                    </h2>
                  </div>
                  <button
                    type="button"
                    aria-label="Close booking"
                    onClick={() => {
                      setBooking(false)
                      resetBookingForm()
                    }}
                  >
                    <X />
                  </button>
                </div>

                <label className="mt-8 block text-xs uppercase tracking-widest">
                  Service
                  <select
                    required
                    value={form.service}
                    onChange={(event) => updateForm("service", event.target.value)}
                    className="mt-2 block w-full border border-ink/30 bg-transparent p-3 text-sm"
                  >
                    {services.map(({ _id, name, price }) => (
                      <option key={_id} value={name}>
                        {name} — {price}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="mt-5 block text-xs uppercase tracking-widest">
                  Barber
                  <select
                    required
                    value={form.barber}
                    onChange={(event) => updateForm("barber", event.target.value)}
                    className="mt-2 block w-full border border-ink/30 bg-transparent p-3 text-sm"
                  >
                    <option>Any available barber</option>
                    {barbers.map(({ _id, name }) => (
                      <option key={_id}>{name}</option>
                    ))}
                  </select>
                </label>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <label className="block text-xs uppercase tracking-widest">
                    Date
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(event) => updateForm("date", event.target.value)}
                      className="mt-2 block w-full border border-ink/30 bg-transparent p-3 text-sm"
                    />
                  </label>
                  <label className="block text-xs uppercase tracking-widest">
                    Time
                    <input
                      required
                      type="time"
                      value={form.time}
                      onChange={(event) => updateForm("time", event.target.value)}
                      className="mt-2 block w-full border border-ink/30 bg-transparent p-3 text-sm"
                    />
                  </label>
                </div>

                <label className="mt-5 block text-xs uppercase tracking-widest">
                  Your name
                  <input
                    required
                    value={form.name}
                    onChange={(event) => updateForm("name", event.target.value)}
                    className="mt-2 block w-full border border-ink/30 bg-transparent p-3 text-sm"
                    placeholder="Alex Morgan"
                  />
                </label>

                <label className="mt-5 block text-xs uppercase tracking-widest">
                  Email
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => updateForm("email", event.target.value)}
                    className="mt-2 block w-full border border-ink/30 bg-transparent p-3 text-sm"
                    placeholder="alex@example.com"
                  />
                </label>

                <label className="mt-5 block text-xs uppercase tracking-widest">
                  Phone
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateForm("phone", event.target.value)}
                    className="mt-2 block w-full border border-ink/30 bg-transparent p-3 text-sm"
                    placeholder="+31 6 1234 5678"
                  />
                </label>

                <label className="mt-5 block text-xs uppercase tracking-widest">
                  Notes (optional)
                  <textarea
                    value={form.notes}
                    onChange={(event) => updateForm("notes", event.target.value)}
                    className="mt-2 block w-full border border-ink/30 bg-transparent p-3 text-sm"
                    rows={3}
                    placeholder="Any preferences or requests"
                  />
                </label>

                {submitError && <p className="mt-4 text-sm text-copper">{submitError}</p>}

                <button
                  disabled={saving}
                  className="mt-8 w-full bg-ink px-5 py-4 text-xs font-bold uppercase tracking-widest text-paper disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Book appointment"}
                  <ArrowRight className="ml-2 inline" size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
