"use client";

import React, { useEffect, useState } from "react";

export default function SiteHeader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // После небольшого скролла — “уезжаем” вверх и исчезаем
      setHide(window.scrollY > 60);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        ...styles.header,
        transform: hide ? "translateY(-110%)" : "translateY(0)",
        opacity: hide ? 0 : 1,
      }}
    >
      <div style={styles.inner}>
        <div style={styles.logo}>ASPIS Network</div>
        <nav style={styles.nav}>
          <a style={styles.link} href="/">Главная</a>
          <a style={styles.link} href="/docs">Документы</a>
          <a style={styles.link} href="/security">Безопасность</a>
          <a style={styles.link} href="/deploy">Развертывание</a>
        </nav>
      </div>
      <div style={styles.divider} />
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
    backdropFilter: "blur(16px)",
    background: "rgba(5,7,11,0.55)",
    transition: "transform 260ms ease, opacity 220ms ease",
  },
  inner: {
    height: 64,
    padding: "0 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#fff",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  },
  logo: {
    fontWeight: 700,
    letterSpacing: 0.3,
    opacity: 0.95,
  },
  nav: {
    display: "flex",
    gap: 18,
    alignItems: "center",
  },
  link: {
    color: "rgba(255,255,255,0.82)",
    textDecoration: "none",
    fontSize: 14,
  },
  divider: {
    height: 1,
    background: "rgba(255,255,255,0.06)",
  },
};
