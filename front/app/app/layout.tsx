import type { Metadata } from "next";
import { Suspense } from "react";
import { SITE_URL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Developer Tools",
  description:
    "Free developer tools: password generator, QR code generator, URL shortener, JSON formatter, JWT tool, encoder/decoder, fake data, color palette, and more.",
  openGraph: {
    title: `Developer Tools | ${SITE_NAME}`,
    description:
      "Free developer tools: password generator, QR codes, URL shortener, JSON formatter, and more.",
    url: `${SITE_URL}/app`,
  },
  alternates: {
    canonical: `${SITE_URL}/app`,
  },
};

function AppToolsFallback() {
  return (
    <main className="flex-1 flex items-center justify-center min-h-[50vh]">
      <p className="text-muted-foreground animate-pulse">Loading tools...</p>
    </main>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<AppToolsFallback />}>
      {children}
    </Suspense>
  );
}
