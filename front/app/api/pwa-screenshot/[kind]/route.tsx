import { ImageResponse } from "next/og";
import {
  PwaScreenshotNarrow,
  PwaScreenshotWide,
} from "@/lib/pwa-screenshot-frame";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site-config";

type RouteContext = { params: Promise<{ kind: string }> };

const WIDE = { width: 1200, height: 675 };
const NARROW = { width: 540, height: 960 };

export async function GET(_request: Request, context: RouteContext) {
  const { kind } = await context.params;

  if (kind === "wide") {
    return new ImageResponse(
      <PwaScreenshotWide title={SITE_NAME} subtitle={SITE_DESCRIPTION} />,
      WIDE
    );
  }

  if (kind === "narrow") {
    return new ImageResponse(
      <PwaScreenshotNarrow title={SITE_NAME} subtitle={SITE_DESCRIPTION} />,
      NARROW
    );
  }

  return new Response("Not Found", { status: 404 });
}
