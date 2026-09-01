import createImageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { sanityClient } from "./client"

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null

export function urlFor(source: SanityImageSource) {
  if (!builder) return null
  return builder.image(source)
}
