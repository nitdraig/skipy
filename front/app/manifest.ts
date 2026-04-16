import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#191819",
    theme_color: "#1d3d53",
    orientation: "portrait",
    icons: [
      {
        src: "/api/pwa-icon/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/api/pwa-icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/api/pwa-icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    // Richer PWA Install UI (Chrome): wide = escritorio; narrow = móvil
    screenshots: [
      {
        src: "/api/pwa-screenshot/wide",
        sizes: "1200x675",
        type: "image/png",
        form_factor: "wide",
        label: `${SITE_NAME} en escritorio`,
      },
      {
        src: "/api/pwa-screenshot/narrow",
        sizes: "540x960",
        type: "image/png",
        form_factor: "narrow",
        label: `${SITE_NAME} en móvil`,
      },
    ],
  };
}
