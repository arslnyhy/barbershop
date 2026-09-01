export const SITE_SETTINGS_QUERY = `*[_id == "siteSettings"][0]{
  shopName,
  tagline,
  description,
  heroHeading,
  heroHeadingEmphasis,
  heroDescription,
  introEyebrow,
  introHeading,
  introHeadingEmphasis,
  introText,
  closingEyebrow,
  closingHeading,
  closingHeadingEmphasis,
  storyEyebrow,
  storyHeading,
  storyHeadingEmphasis,
  storyParagraphs,
  address,
  directionsUrl,
  coordinatesLabel,
  phone,
  email,
  openingHours
}`

export const SERVICES_QUERY = `*[_type == "service"] | order(order asc, name asc){
  _id,
  name,
  description,
  duration,
  price
}`

export const BARBERS_QUERY = `*[_type == "barber"] | order(order asc, name asc){
  _id,
  name,
  specialty,
  bio,
  "photoUrl": photo.asset->url
}`

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc){
  _id,
  quote,
  author
}`
