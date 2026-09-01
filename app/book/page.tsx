import { getBarbers, getServices } from "@/lib/sanity/content"
import { BookClient } from "@/components/book-client"

export default async function Book() {
  const [services, barbers] = await Promise.all([getServices(), getBarbers()])
  return <BookClient services={services} barbers={barbers} />
}
