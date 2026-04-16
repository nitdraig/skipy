import type React from "react";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { JsonLd } from "../components/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_AUTHOR,
} from "@/lib/site-config";

const ibm = IBM_Plex_Mono({ weight: "400", subsets: ["latin"] });

const ogImage = `${SITE_URL}/card-image.webp`;

export const viewport: Viewport = {
  themeColor: "#1d3d53",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  title: {
    default: `${SITE_NAME} | Free Multi-tools for Developers`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "free tools",
    "programmers",
    "IT users",
    "multi-tools",
    "software development",
    "web applications",
    "free software",
    "tool kit",
    "open source",
    "developer tools",
    "password generator",
    "QR code generator",
    "URL shortener",
    "JSON formatter",
    "software engineers",
    "web developers",
    "agile development",
    "systems administrators",
    "development tools",
    "IT professionals",
  ],
  authors: [{ name: SITE_AUTHOR }],
  creator: SITE_AUTHOR,
  openGraph: {
    type: "website",
    locale: "en",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Free Multi-tools for Developers`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Developer tools`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Multi-tools`,
    description: SITE_DESCRIPTION,
    creator: SITE_AUTHOR,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={ibm.className}>
                <JsonLd />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    {children}
                    <Footer />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
