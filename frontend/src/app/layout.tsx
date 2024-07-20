import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

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

  robots: {
    index: true,
    follow: true,
    nocache: true,
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
    <html lang="es">
      <link rel="canonical" href="https://skipy.top" />
      <body className={ibm.className}>{children}</body>
    </html>
  );
}
