import { getBarbers, getServices, getSiteSettings, getTestimonials } from "@/lib/sanity/content"
import { HomeClient } from "@/components/home-client"

export default async function Page() {
  const [settings, services, barbers, testimonials] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getBarbers(),
    getTestimonials(),
  ])
  return <HomeClient settings={settings} services={services} barbers={barbers} testimonials={testimonials} />
}
