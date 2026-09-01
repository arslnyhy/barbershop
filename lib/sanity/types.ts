export type Service = {
  _id: string
  name: string
  description: string
  duration: string
  price: string
}

export type Barber = {
  _id: string
  name: string
  specialty: string
  bio: string
  photoUrl: string | null
}

export type Testimonial = {
  _id: string
  quote: string
  author: string
}

export type OpeningHoursRow = {
  days: string
  hours: string
}

export type SiteSettings = {
  shopName: string
  tagline: string
  description: string
  heroHeading: string
  heroHeadingEmphasis: string
  heroDescription: string
  introEyebrow: string
  introHeading: string
  introHeadingEmphasis: string
  introText: string
  closingEyebrow: string
  closingHeading: string
  closingHeadingEmphasis: string
  storyEyebrow: string
  storyHeading: string
  storyHeadingEmphasis: string
  storyParagraphs: string[]
  address: { line1: string; line2: string }
  directionsUrl: string
  coordinatesLabel: string
  phone: string
  email: string
  openingHours: OpeningHoursRow[]
}
