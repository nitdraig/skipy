import { ImageResponse } from "next/og";
import { PwaMarkIcon } from "@/lib/pwa-mark-icon";

type RouteContext = { params: Promise<{ size: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { size } = await context.params;
  const dim = size === "512" ? 512 : size === "192" ? 192 : null;
  if (dim === null) {
    return new Response("Not Found", { status: 404 });
  }

  return new ImageResponse(<PwaMarkIcon dim={dim} />, {
    width: dim,
    height: dim,
  });
}
