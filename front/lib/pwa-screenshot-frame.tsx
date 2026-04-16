/**
 * Marcos promocionales para el manifest PWA (Rich Install UI de Chrome).
 * Debe renderizarse solo dentro de `ImageResponse` (`next/og`).
 */
export function PwaScreenshotWide({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 72,
        background: "linear-gradient(126deg, #1d3d53 0%, #191819 55%, #0f1419 100%)",
        color: "#e8e8e8",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 30,
          maxWidth: 900,
          lineHeight: 1.35,
          color: "rgba(232,232,232,0.88)",
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          marginTop: "auto",
          fontSize: 20,
          color: "rgba(232,232,232,0.55)",
        }}
      >
        Vista previa — escritorio
      </div>
    </div>
  );
}

export function PwaScreenshotNarrow({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 48,
        background: "linear-gradient(160deg, #1d3d53 0%, #191819 60%, #0f1419 100%)",
        color: "#e8e8e8",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 22,
          fontSize: 22,
          lineHeight: 1.4,
          color: "rgba(232,232,232,0.88)",
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          marginTop: "auto",
          fontSize: 16,
          color: "rgba(232,232,232,0.55)",
        }}
      >
        Vista previa — móvil
      </div>
    </div>
  );
}
