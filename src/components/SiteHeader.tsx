"use client";

import React, { useEffect, useMemo, useState } from "react";

type Props = {
  /** Если true — шапка ведёт себя как “второй слой”: поверх hero и исчезает при скролле */
  overlay?: boolean;
};

export default function SiteHeader({ overlay = false }: Props) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // “Исчезание” за первые ~160px скролла
  const { opacity, translateY, blur } = useMemo(() => {
    if (!overlay) return { opacity: 1, translateY: 0, blur: 10 };
    const t = Math.min(1, scrollY / 160);
    return {
      opacity: 1 - t,
      translateY: -18 * t,
      blur: 10 + 10 * t,
    };
  }, [overlay, scrollY]);

  const styles: Record<string, React.CSSProperties> = {
    header: {
      position: overlay ? "absolute" : "sticky",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 28px",
      background: "rgba(2, 6, 10, 0.35)",
      backdropFilter: `blur(${blur}px)`,
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      transform: `translateY(${translateY}px)`,
      opacity,
      pointerEvents: overlay && opacity < 0.05 ? "none" : "auto",
      transition: "opacity 120ms linear, transform 120ms linear, backdrop-filter 120ms linear",
    },
    brand: {
      fontWeight: 650,
      letterSpacing: 0.4,
      color: "rgba(255,255,255,0.92)",
      textDecoration: "none",
      fontSize: 16,
    },
    nav: {
      display: "flex",
      gap: 18,
      alignItems: "center",
      color: "rgba(255,255,255,0.78)",
      fontSize: 14,
    },
    link: {
      color: "rgba(255,255,255,0.78)",
      textDecoration: "none",
      padding: "8px 10px",
      borderRadius: 12,
      border: "1px solid transparent",
      transition: "background 150ms ease, border-color 150ms ease, color 150ms ease",
    },
  };

  return (
    <header style={styles.header}>
      <a href="/" style={styles.brand}>
        ASPIS Network
      </a>

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
    </header>
  );
}
