import React from "react";

const data: Record<
  string,
  { title: string; subtitle: string; body: string }
> = {
  "amo-armor": {
    title: "AMO ARMOR",
    subtitle: "Reserve management module",
    body: "Здесь будет полное описание верхнего слоя: управление резервами, капиталом, правила распределения и контроль потоков.",
  },
  core: {
    title: "CORE",
    subtitle: "Immutable code (No Owner)",
    body: "Здесь будет полное описание ядра: инварианты, принципы, гарантии устойчивости и предсказуемости системы.",
  },
  "rsi-shell": {
    title: "RSI SHELL",
    subtitle: "Adaptive volatility protection",
    body: "Здесь будет полное описание нижнего слоя: механизмы стабилизации, адаптация к режимам рынка и защита потоков.",
  },
};

export default function LayerPage({ params }: { params: { slug: string } }) {
  const d = data[params.slug] ?? {
    title: params.slug.toUpperCase(),
    subtitle: "Layer",
    body: "Страница слоя (заглушка).",
  };

  return (
    <main style={styles.page}>
      <div style={styles.inner}>
        <div style={styles.kicker}>ASPIS LAYERS</div>
        <h1 style={styles.h1}>{d.title}</h1>
        <div style={styles.sub}>{d.subtitle}</div>
        <div style={styles.card}>{d.body}</div>
        <a style={styles.back} href="/">
          ← На главную
        </a>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#05070a",
    color: "rgba(255,255,255,0.92)",
    paddingTop: 110,
    paddingBottom: 70,
  },
  inner: {
    width: "min(900px, 92vw)",
    margin: "0 auto",
  },
  kicker: {
    fontSize: 12,
    letterSpacing: 3,
    color: "rgba(255,255,255,0.55)",
  },
  h1: {
    marginTop: 10,
    fontSize: 44,
    marginBottom: 8,
  },
  sub: {
    color: "rgba(255,255,255,0.70)",
    marginBottom: 18,
  },
  card: {
    borderRadius: 18,
    padding: 18,
    border: "1px solid rgba(255,255,255,0.08)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
    lineHeight: 1.7,
    color: "rgba(255,255,255,0.78)",
  },
  back: {
    display: "inline-block",
    marginTop: 18,
    color: "rgba(0,255,200,0.85)",
    textDecoration: "none",
    fontWeight: 700,
  },
};
