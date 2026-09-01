import { defineType, defineField } from "sanity"
import { TagIcon } from "@sanity/icons/Tag"

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      description: "e.g. 45 min",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      description: "e.g. €48",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Controls where this service appears in the menu, lowest first",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Menu order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "price" },
  },
})
