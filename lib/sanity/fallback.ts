// Used until the Sanity project is configured (see studio/) and content is entered,
// so the site keeps looking the way it did before the CMS existed.
import type { Barber, OpeningHoursRow, Service, SiteSettings, Testimonial } from "./types"

export const fallbackServices: Service[] = [
  { _id: "signature-cut", name: "The Signature Cut", description: "Precision cut, wash & finish", duration: "45 min", price: "€48" },
  { _id: "cut-beard", name: "Cut & Beard", description: "A complete reset from top to chin", duration: "60 min", price: "€62" },
  { _id: "classic-shave", name: "The Classic Shave", description: "Hot towel, straight razor & calm", duration: "30 min", price: "€38" },
  { _id: "father-son", name: "Father & Son", description: "A chair for both of you", duration: "60 min", price: "€70" },
  { _id: "long-game", name: "The Long Game", description: "Shape, treatment and styling for longer hair", duration: "75 min", price: "€72" },
  { _id: "head-shave", name: "Head Shave", description: "Clean, close and finished with care", duration: "30 min", price: "€36" },
]

export const fallbackBarbers: Barber[] = [
  { _id: "milo", name: "Milo van Dijk", specialty: "FOUNDING BARBER", bio: "The precise one. Milo brings 14 years of European barbering to every chair.", photoUrl: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=700&q=80" },
  { _id: "jules", name: "Jules Bakker", specialty: "TEXTURE & SHAPE", bio: "For the undone, the curly and everything that refuses to sit still.", photoUrl: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=700&q=80" },
  { _id: "amara", name: "Amara de Wit", specialty: "CLASSIC SHAVES", bio: "Quiet hands, a steady razor, and an encyclopedic knowledge of good coffee.", photoUrl: "https://images.unsplash.com/photo-1619410291956-7d7c4f75b4c2?auto=format&fit=crop&w=700&q=80" },
  { _id: "raf", name: "Raf Smit", specialty: "MODERN CUTS", bio: "The newest eye at CUT / THRU. Clean lines and a little left of centre.", photoUrl: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=700&q=80" },
]

export const fallbackTestimonials: Testimonial[] = [
  { _id: "tomas", quote: "“The best cut I’ve had in Amsterdam. The room is calm, the team is exact, and I left feeling like myself — just sharper.”", author: "— TOMAS R., DE PIJP" },
  { _id: "ella", quote: "“No small talk required, though the conversation is always good. This place understands that a haircut can be a ritual.”", author: "— ELLA M., OOST" },
  { _id: "nick", quote: "“Finally somewhere that treats a shave as more than an add-on. Beautiful details from door to mirror.”", author: "— NICK J., CENTRUM" },
]

export const fallbackOpeningHours: OpeningHoursRow[] = [
  { days: "Tue—Fri", hours: "09:00—19:00" },
  { days: "Sat", hours: "09:00—17:00" },
  { days: "Sun—Mon", hours: "Closed" },
]

export const fallbackSiteSettings: SiteSettings = {
  shopName: "CUT / THRU",
  tagline: "Amsterdam · Since 2014",
  description: "A considered barbershop for modern Amsterdam. Precision cuts, classic shaves, no rush.",
  heroHeading: "Good hair.",
  heroHeadingEmphasis: "Good energy.",
  heroDescription: "A considered barbershop for modern Amsterdam. Precision cuts, classic shaves, no rush.",
  introEyebrow: "The chair is yours",
  introHeading: "Not just a haircut.",
  introHeadingEmphasis: "A moment to reset.",
  introText: "CUT / THRU is a small, independent barbershop in the heart of Amsterdam. We make space for the details — the right shape, the right conversation, and a little time out of your day.",
  closingEyebrow: "Ready when you are",
  closingHeading: "Leave sharper",
  closingHeadingEmphasis: "than you arrived.",
  storyEyebrow: "Our story",
  storyHeading: "Made for",
  storyHeadingEmphasis: "the in-between.",
  storyParagraphs: [
    "The space between work and dinner. Between who you were and who you are becoming. We opened CUT / THRU because the best barbershops have always been more than a service — they are part of a city's rhythm.",
    "A good barbershop is part of a city's rhythm. Come in from the rain, take the weight off, and leave sharper than you arrived.",
  ],
  address: { line1: "Wibautstraat 131-D", line2: "1091 GL Amsterdam" },
  directionsUrl: "https://maps.google.com",
  coordinatesLabel: "52.3549° N, 4.9156° E",
  phone: "+31203334455",
  email: "hello@cutthru.amsterdam",
  openingHours: fallbackOpeningHours,
}
