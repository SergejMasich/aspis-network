"use client";

import React from "react";

export default function SiteHeader() {
  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <div style={styles.brand}>ASPIS Network</div>

        <nav style={styles.nav}>
          <a style={styles.link} href="/">
            Главная
          </a>
          <a style={styles.link} href="/docs">
            Документы
          </a>
          <a style={styles.link} href="/security">
            Безопасность
          </a>
          <a style={styles.link} href="/deploy">
            Развертывание
          </a>
        </nav>
      </div>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: 72,
    zIndex: 50,
    background: "rgba(0,0,0,0.35)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    backdropFilter: "blur(10px)",
    transform: "translateY(var(--aspis-header-shift, 0px))",
    opacity: "var(--aspis-header-opacity, 1)" as any,
    transition: "opacity 120ms linear",
    pointerEvents: "var(--aspis-header-pe, auto)" as any,
  },
  inner: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 28px",
    maxWidth: 1200,
    margin: "0 auto",
  },
  brand: {
    color: "rgba(255,255,255,0.92)",
    fontWeight: 700,
    letterSpacing: 0.4,
  },
  nav: {
    display: "flex",
    gap: 22,
  },
  link: {
    color: "rgba(255,255,255,0.75)",
    textDecoration: "none",
    fontSize: 14,
  },
};
