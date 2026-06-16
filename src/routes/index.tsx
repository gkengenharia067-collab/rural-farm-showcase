import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: FallbackPage,
});

function FallbackPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        background: "#f9fafb",
        gap: "12px",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "#16a34a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 28,
        }}
      >
        🌱
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", margin: 0 }}>
        Dashboard carregado
      </h1>
      <p style={{ color: "#6b7280", margin: 0 }}>
        Preview funcionando. Rota / OK.
      </p>
      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <a
          href="/catalogo"
          style={{
            padding: "8px 18px",
            borderRadius: 8,
            background: "#16a34a",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          /catalogo
        </a>
        <a
          href="/pedidos"
          style={{
            padding: "8px 18px",
            borderRadius: 8,
            background: "#e5e7eb",
            color: "#374151",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          /pedidos
        </a>
      </div>
    </div>
  );
}
