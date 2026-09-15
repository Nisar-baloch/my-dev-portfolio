import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nisar-ahmed.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nisar Ahmed — Full-Stack Developer | MERN Stack",
    template: "%s | Nisar Ahmed",
  },
  description:
    "Nisar Ahmed is a Full-Stack and MERN Stack Developer building fast, scalable, and thoughtful digital experiences. Skilled in React, Next.js, Node.js, MongoDB, TypeScript, and Python. Co-Founder at Inbyo Tech.",
  keywords: [
    "Nisar Ahmed",
    "Full-Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Python",
    "Django",
    "Pakistan Developer",
    "Inbyo Tech",
  ],
  authors: [{ name: "Nisar Ahmed", url: siteUrl }],
  creator: "Nisar Ahmed",
  openGraph: {
    title: "Nisar Ahmed — Full-Stack Developer | MERN Stack",
    description:
      "Full-Stack and MERN Stack Developer building modern web applications, APIs, and digital products. Co-Founder at Inbyo Tech.",
    url: siteUrl,
    siteName: "Nisar Ahmed Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nisar Ahmed — Full-Stack Developer | MERN Stack",
    description:
      "Full-Stack and MERN Stack Developer building modern web applications, APIs, and digital products. Co-Founder at Inbyo Tech.",
    creator: "@nisarahmed",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground selection:bg-accent/30 flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
