import { defineType, defineField } from "sanity"

export const openingHoursRow = defineType({
  name: "openingHoursRow",
  title: "Opening hours row",
  type: "object",
  fields: [
    defineField({
      name: "days",
      title: "Days",
      description: "e.g. Tue—Fri or Sun—Mon",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "hours",
      title: "Hours",
      description: "e.g. 09:00—19:00 or Closed",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "days", subtitle: "hours" },
  },
})
