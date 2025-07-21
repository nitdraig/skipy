import type React from "react";
import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ibm = IBM_Plex_Mono({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skipy | Free Multi-tools",
  description: "Free and free tools for programmers and IT users.",

  keywords: [
    "Free tools",
    "programmers",
    "IT users",
    "multi -tools",
    "software development",
    "Programming profits",
    "Web applications",
    "Free software",
    "Tool kit",
    "Open source",
    "IT resources",
    "Essential tools",
    "Software engineers",
    "Web developers",
    "depuration",
    "agile development",
    "Systems administrators",
    "Development tools",
    "IT professionals",
  ],
  twitter: {
    card: "summary_large_image",
    title: "Skipy | Multi-tools",
    description: "Free and free tools for programmers and IT users.",
    creator: "Avellaneda Agustín",
    images: [
      "https://res.cloudinary.com/draig/image/upload/v1753119537/Skipy/4cfdc0b8-6ef3-45bc-abc9-edf9f1ed0257.png",
    ],
  },

  openGraph: {
    images:
      "https://res.cloudinary.com/draig/image/upload/v1753119537/Skipy/4cfdc0b8-6ef3-45bc-abc9-edf9f1ed0257.png",
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
