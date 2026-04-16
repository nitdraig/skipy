/**
 * Marca visual compartida para favicon, apple-touch-icon e iconos del manifest PWA.
 * Pensado para usarse dentro de `ImageResponse` de `next/og`.
 */
export function PwaMarkIcon({ dim }: { dim: number }) {
  const fontSize = Math.round(dim * 0.4);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(126deg, #1d3d53 0%, #191819 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize,
          fontWeight: 700,
          color: "#e8e8e8",
          letterSpacing: "-0.06em",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        S
      </div>
    </div>
  );
}
