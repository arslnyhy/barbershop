import { sanityClient } from "./client"
import { SITE_SETTINGS_QUERY, SERVICES_QUERY, BARBERS_QUERY, TESTIMONIALS_QUERY } from "./queries"
import { fallbackBarbers, fallbackServices, fallbackSiteSettings, fallbackTestimonials } from "./fallback"
import type { Barber, Service, SiteSettings, Testimonial } from "./types"

// Sanity isn't configured yet, or the query failed — fall back to the built-in
// content so the site keeps rendering instead of breaking.
async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  if (!sanityClient) return fallback
  try {
    const data = await sanityClient.fetch<T>(query, {}, { next: { revalidate: 60 } })
    return data ?? fallback
  } catch (err) {
    console.error("Sanity fetch failed, using fallback content:", err)
    return fallback
  }
}

function normalizeSiteSettings(settings: Partial<SiteSettings> | null): SiteSettings {
  const merged = {
    ...fallbackSiteSettings,
    ...(settings ?? {}),
  }

  return {
    ...merged,
    storyParagraphs:
      Array.isArray(settings?.storyParagraphs) && settings.storyParagraphs.length > 0
        ? settings.storyParagraphs.filter((paragraph): paragraph is string => Boolean(paragraph))
        : fallbackSiteSettings.storyParagraphs,
    openingHours:
      Array.isArray(settings?.openingHours) && settings.openingHours.length > 0
        ? settings.openingHours.filter((row): row is SiteSettings["openingHours"][number] => Boolean(row?.days) && Boolean(row?.hours))
        : fallbackSiteSettings.openingHours,
    address: {
      ...fallbackSiteSettings.address,
      ...(settings?.address ?? {}),
    },
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await safeFetch<Partial<SiteSettings> | null>(SITE_SETTINGS_QUERY, null)
  return normalizeSiteSettings(settings)
}

export async function getServices(): Promise<Service[]> {
  const services = await safeFetch<Service[]>(SERVICES_QUERY, [])
  return services.length > 0 ? services : fallbackServices
}

export async function getBarbers(): Promise<Barber[]> {
  const barbers = await safeFetch<Barber[]>(BARBERS_QUERY, [])
  return barbers.length > 0 ? barbers : fallbackBarbers
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const testimonials = await safeFetch<Testimonial[]>(TESTIMONIALS_QUERY, [])
  return testimonials.length > 0 ? testimonials : fallbackTestimonials
}
