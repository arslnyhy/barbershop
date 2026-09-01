import type { StructureResolver } from "sanity/structure"
import { CogIcon } from "@sanity/icons/Cog"
import { TagIcon } from "@sanity/icons/Tag"
import { UserIcon } from "@sanity/icons/User"
import { CommentIcon } from "@sanity/icons/Comment"

const SINGLETONS = ["siteSettings"]

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site Settings")),

      S.divider(),

      S.documentTypeListItem("service").title("Services").icon(TagIcon),
      S.documentTypeListItem("barber").title("Barbers").icon(UserIcon),
      S.documentTypeListItem("testimonial").title("Testimonials").icon(CommentIcon),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) =>
          !SINGLETONS.includes(listItem.getId() as string) &&
          !["service", "barber", "testimonial"].includes(listItem.getId() as string)
      ),
    ])
