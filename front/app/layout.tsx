import type React from "react";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const ibm = IBM_Plex_Mono({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skipy | Free Multi-tools",
  description:
    "MultiHerramientas gratuitas de uso libre para programadores y usuarios IT. ",

  keywords: [
    "herramientas gratuitas",
    "programadores",
    "usuarios IT",
    "multiHerramientas",
    "desarrollo de software",
    "utilidades de programación",
    "aplicaciones web",
    "software gratuito",
    "kit de herramientas",
    "código abierto",
    "recursos IT",
    "herramientas esenciales",
    "ingenieros de software",
    "desarrolladores web",
    "depuración",
    "desarrollo ágil",
    "administradores de sistemas",
    "herramientas de desarrollo",
    "profesionales IT",
  ],
  twitter: {
    card: "summary_large_image",
    title: "Skipy | Multi-tools",
    description:
      "MultiHerramientas gratuitas de uso libre para programadores y usuarios IT.",
    creator: "Avellaneda Agustín",
    images: [
      "https://res.cloudinary.com/draig/image/upload/v1705458951/Skipy/cfdmbv9lwkyzxj4zmnug.png",
    ],
  },

  openGraph: {
    images:
      "https://res.cloudinary.com/draig/image/upload/v1705458951/Skipy/cfdmbv9lwkyzxj4zmnug.png",
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
