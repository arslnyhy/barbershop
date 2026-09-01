import { defineCliConfig } from "sanity/cli"
import { loadRootEnv } from "./loadRootEnv"

loadRootEnv()

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
})
