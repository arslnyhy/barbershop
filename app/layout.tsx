import type { Metadata } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import "./globals.css"

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" })
const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" })

export const metadata: Metadata = { title: { default: "CUT / THRU — Amsterdam Barbers", template: "%s — CUT / THRU" }, description: "A considered barbershop for modern Amsterdam. Precision cuts, classic shaves, no rush." }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" className={`${sans.variable} ${display.variable}`}><body>{children}</body></html> }
