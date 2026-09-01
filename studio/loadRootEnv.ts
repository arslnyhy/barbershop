import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"

function stripWrappingQuotes(value: string): string {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }

  return value
}

export function loadRootEnv(): void {
  const envPath = resolve(process.cwd(), "../.env.local")

  if (!existsSync(envPath)) {
    return
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/)

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line || line.startsWith("#")) {
      continue
    }

    const equalsIndex = line.indexOf("=")

    if (equalsIndex <= 0) {
      continue
    }

    const key = line.slice(0, equalsIndex).trim()
    const value = stripWrappingQuotes(line.slice(equalsIndex + 1).trim())

    if (!(key in process.env)) {
      process.env[key] = value
    }
  }
}