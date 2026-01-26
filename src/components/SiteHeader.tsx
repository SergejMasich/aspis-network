"use client";

import React from "react";

export default function SiteHeader() {
  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <div style={styles.brand}>ASPIS Network</div>

        <nav style={styles.nav}>
          <a style={styles.link} href="/">Главная</a>
          <a style={styles.link} href="/docs">Документы</a>
          <a style={styles.link} href="/security">Безопасность</a>
          <a style={styles.link} href="/deploy">Развертывание</a>
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
    zIndex: 50,

    // ВАЖНО: трансформацию/прозрачность задаёт page.tsx через CSS variables:
    transform: "translateY(var(--aspis-header-translate-y, 0px))",
    opacity: "var(--aspis-header-opacity, 1)",
    backdropFilter: "blur(var(--aspis-header-blur, 0px))",

    background: "rgba(5,7,13,0.62)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  inner: {
    width: "min(1200px, 100%)",
    margin: "0 auto",
    height: 64,
    padding: "0 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    fontWeight: 700,
    letterSpacing: 0.4,
    color: "rgba(255,255,255,0.92)",
  },
  nav: {
    display: "flex",
    gap: 22,
    alignItems: "center",
  },
  link: {
    color: "rgba(255,255,255,0.78)",
    textDecoration: "none",
    fontSize: 14,
  },
};

