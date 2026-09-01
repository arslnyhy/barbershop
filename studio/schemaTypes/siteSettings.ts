import { defineType, defineField } from "sanity"
import { CogIcon } from "@sanity/icons/Cog"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "home", title: "Home page" },
    { name: "story", title: "Our story" },
    { name: "visit", title: "Visit / contact" },
  ],
  fields: [
    defineField({
      name: "shopName",
      title: "Shop name",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "e.g. Amsterdam · Since 2014",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "description",
      title: "Site description",
      description: "Used for SEO and social sharing",
      type: "text",
      rows: 2,
      group: "general",
    }),

    defineField({
      name: "heroHeading",
      title: "Hero heading",
      type: "string",
      group: "home",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroHeadingEmphasis",
      title: "Hero heading (emphasis line)",
      type: "string",
      group: "home",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero description",
      type: "text",
      rows: 2,
      group: "home",
    }),
    defineField({
      name: "introEyebrow",
      title: "Intro eyebrow",
      type: "string",
      group: "home",
    }),
    defineField({
      name: "introHeading",
      title: "Intro heading",
      type: "string",
      group: "home",
    }),
    defineField({
      name: "introHeadingEmphasis",
      title: "Intro heading (emphasis line)",
      type: "string",
      group: "home",
    }),
    defineField({
      name: "introText",
      title: "Intro text",
      type: "text",
      rows: 3,
      group: "home",
    }),
    defineField({
      name: "closingEyebrow",
      title: "Closing eyebrow",
      type: "string",
      group: "home",
    }),
    defineField({
      name: "closingHeading",
      title: "Closing heading",
      type: "string",
      group: "home",
    }),
    defineField({
      name: "closingHeadingEmphasis",
      title: "Closing heading (emphasis line)",
      type: "string",
      group: "home",
    }),

    defineField({
      name: "storyEyebrow",
      title: "Story eyebrow",
      type: "string",
      group: "story",
    }),
    defineField({
      name: "storyHeading",
      title: "Story heading",
      type: "string",
      group: "story",
    }),
    defineField({
      name: "storyHeadingEmphasis",
      title: "Story heading (emphasis line)",
      type: "string",
      group: "story",
    }),
    defineField({
      name: "storyParagraphs",
      title: "Story paragraphs",
      description: "First paragraph is also used as the short story teaser on the home page",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      group: "story",
    }),

    defineField({
      name: "address",
      title: "Address",
      type: "object",
      group: "visit",
      fields: [
        defineField({ name: "line1", title: "Line 1", type: "string" }),
        defineField({ name: "line2", title: "Line 2", type: "string" }),
      ],
    }),
    defineField({
      name: "directionsUrl",
      title: "Directions URL",
      type: "url",
      group: "visit",
    }),
    defineField({
      name: "coordinatesLabel",
      title: "Coordinates label",
      description: "e.g. 52.3549° N, 4.9156° E",
      type: "string",
      group: "visit",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      description: "In international format, e.g. +31203334455",
      type: "string",
      group: "visit",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.email(),
      group: "visit",
    }),
    defineField({
      name: "openingHours",
      title: "Opening hours",
      type: "array",
      of: [{ type: "openingHoursRow" }],
      group: "visit",
    }),
  ],
  preview: {
    select: { title: "shopName" },
    prepare: ({ title }) => ({ title: title || "Site Settings" }),
  },
})
