import { ImageResponse } from "next/og";
import { PwaMarkIcon } from "@/lib/pwa-mark-icon";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<PwaMarkIcon dim={32} />, {
    ...size,
  });
}
