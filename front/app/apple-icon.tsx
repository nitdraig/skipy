import { ImageResponse } from "next/og";
import { PwaMarkIcon } from "@/lib/pwa-mark-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<PwaMarkIcon dim={180} />, {
    ...size,
  });
}
