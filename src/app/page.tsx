"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import AspisShield from "@/components/AspisShield";

type LayerKey = "amo" | "core" | "rsi";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const overviewRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0); // 0..1 for hero animation
  const [unlocked, setUnlocked] = useState(false);

  // Scroll-driven progress for the hero (no extra libs)
  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;

        const el = heroRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;

        // We animate while hero section is being scrolled:
        // start when top reaches viewport top, end when bottom reaches viewport top.
        const total = rect.height - viewportH;
        const scrolled = -rect.top;

        const raw = total > 0 ? scrolled / total : 0;
        const p = clamp01(raw);

        setScrollProgress(p);
        setUnlocked(p >= 0.72);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const anim = useMemo(() => {
    // Make the reveal feel premium: slow start, strong finish
    const t = easeOutCubic(scrollProgress);

    // "Split" distances
    const split = 110 * t; // px
    const glow = clamp01((scrollProgress - 0.72) / 0.28); // 0..1 after unlock

    // Overall hero scale & fade
    const shieldScale = 1 - 0.06 * t;
    const shieldLift = -18 * t;

    // CTA fade out as we scroll
    const ctaAlpha = 1 - clamp01(scrollProgress / 0.55);

    return {
      split,
      glow,
      shieldScale,
      shieldLift,
      ctaAlpha,
    };
  }, [scrollProgress]);

  const scrollToOverview = () => {
    overviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onPickLayer = (key: LayerKey) => {
    // For the "premium" landing feel:
    // First: scroll to overview where the cards live.
    // The user can then tap "Подробнее".
    scrollToOverview();

    // Optionally: you can later add highlighting by key (state)
    // For now, keep it simple and reliable.
  };

  const styles = useMemo(() => {
    const accent = `rgba(0, 255, 204, ${0.22 + 0.35 * anim.glow})`;
    const ring = `rgba(120, 255, 230, ${0.18 + 0.45 * anim.glow})`;

    return {
      page: {
        minHeight: "100vh",
        background: "radial-gradient(1200px 800px at 50% 20%, rgba(0,255,200,0.12) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #05070d 0%, #04060b 40%, #050816 100%)",
        color: "#fff",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      } as React.CSSProperties,

      // --- TOP NAV (second layer) ---
      nav: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 64,
        display: "flex",
        alignItems: "center",
        backdropFilter: "blur(10px)",
        background: "rgba(5, 7, 13, 0.55)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      } as React.CSSProperties,
      navInner: {
        width: "min(1100px, 92vw)",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      } as React.CSSProperties,
      brand: { fontWeight: 650, letterSpacing: 0.3 } as React.CSSProperties,
      navLinks: {
        display: "flex",
        gap: 18,
        fontSize: 14,
        opacity: 0.92,
      } as React.CSSProperties,
      navA: {
        color: "rgba(255,255,255,0.85)",
        textDecoration: "none",
      } as React.CSSProperties,

      // --- HERO WRAPPER ---
      heroSection: {
        position: "relative",
        height: "200vh", // scroll space for the animation
        paddingTop: 64, // room for fixed nav
      } as React.CSSProperties,
      heroSticky: {
        position: "sticky",
        top: 64,
        height: "calc(100vh - 64px)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      } as React.CSSProperties,
      heroInner: {
        width: "min(1100px, 92vw)",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        alignItems: "center",
        gap: 28,
      } as React.CSSProperties,

      // left column
      heroText: {
        transform: `translateY(${Math.max(0, 12 * scrollProgress)}px)`,
        opacity: 0.98,
      } as React.CSSProperties,
      h1: {
        fontSize: "clamp(34px, 4vw, 54px)",
        lineHeight: 1.02,
        margin: 0,
        letterSpacing: 1.2,
      } as React.CSSProperties,
      subtitle: {
        marginTop: 14,
        fontSize: 16,
        lineHeight: 1.5,
        color: "rgba(255,255,255,0.78)",
        maxWidth: 520,
      } as React.CSSProperties,
      ctaRow: {
        marginTop: 18,
        display: "flex",
        gap: 12,
        alignItems: "center",
        opacity: anim.ctaAlpha,
        pointerEvents: anim.ctaAlpha < 0.12 ? "none" : "auto",
        transition: "opacity 180ms linear",
      } as React.CSSProperties,
      primaryBtn: {
        padding: "11px 16px",
        borderRadius: 999,
        background: "linear-gradient(180deg, rgba(0,255,200,0.95), rgba(0,210,170,0.8))",
        color: "#041016",
        fontWeight: 650,
        textDecoration: "none",
        boxShadow: `0 0 0 1px rgba(255,255,255,0.12), 0 12px 38px ${accent}`,
      } as React.CSSProperties,
      ghostBtn: {
        padding: "11px 16px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.06)",
        color: "rgba(255,255,255,0.9)",
        fontWeight: 600,
        textDecoration: "none",
        border: "1px solid rgba(255,255,255,0.12)",
      } as React.CSSProperties,
      hint: {
        marginTop: 18,
        fontSize: 12,
        color: "rgba(255,255,255,0.55)",
        letterSpacing: 0.3,
      } as React.CSSProperties,

      // right column: shield stage
      stage: {
        position: "relative",
        width: "100%",
        height: "min(620px, 70vh)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateY(${anim.shieldLift}px) scale(${anim.shieldScale})`,
        transition: "transform 80ms linear",
      } as React.CSSProperties,

      // Three "parts" illusion (labels + glow + subtle split)
      partTop: {
        position: "absolute",
        top: `calc(50% - 190px - ${anim.split}px)`,
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(440px, 80%)",
        padding: "10px 14px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.05)",
        border: `1px solid rgba(255,255,255,${0.08 + 0.12 * anim.glow})`,
        boxShadow: `0 16px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05)`,
        textAlign: "center",
        opacity: unlocked ? 1 : 0,
        pointerEvents: unlocked ? "auto" : "none",
        transition: "opacity 220ms ease",
      } as React.CSSProperties,
      partCore: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "min(420px, 76%)",
        padding: "12px 16px",
        borderRadius: 20,
        background: `radial-gradient(420px 220px at 50% 10%, ${ring} 0%, rgba(255,255,255,0.05) 55%, rgba(255,255,255,0.04) 100%)`,
        border: `1px solid rgba(255,255,255,${0.10 + 0.18 * anim.glow})`,
        boxShadow: `0 18px 60px rgba(0,0,0,0.5), 0 0 60px ${accent}`,
        textAlign: "center",
        opacity: unlocked ? 1 : 0,
        pointerEvents: unlocked ? "auto" : "none",
        transition: "opacity 220ms ease",
      } as React.CSSProperties,
      partBottom: {
        position: "absolute",
        top: `calc(50% + 190px + ${anim.split}px)`,
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(440px, 80%)",
        padding: "10px 14px",
        borderRadius: 16,
        background: "rgba(255,255,255,0.05)",
        border: `1px solid rgba(255,255,255,${0.08 + 0.12 * anim.glow})`,
        boxShadow: `0 16px 50px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05)`,
        textAlign: "center",
        opacity: unlocked ? 1 : 0,
        pointerEvents: unlocked ? "auto" : "none",
        transition: "opacity 220ms ease",
      } as React.CSSProperties,

      layerTitle: {
        fontSize: 12,
        letterSpacing: 2.2,
        textTransform: "uppercase" as const,
        opacity: 0.92,
      } as React.CSSProperties,
      layerDesc: {
        marginTop: 6,
        fontSize: 13,
        color: "rgba(255,255,255,0.72)",
        lineHeight: 1.35,
      } as React.CSSProperties,
      layerHint: {
        marginTop: 10,
        fontSize: 12,
        color: "rgba(255,255,255,0.62)",
      } as React.CSSProperties,
      layerClickable: {
        cursor: "pointer",
        userSelect: "none" as const,
      } as React.CSSProperties,

      // little scroll meter
      meterWrap: {
        position: "absolute",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        width: 180,
        textAlign: "center",
        opacity: 0.92,
      } as React.CSSProperties,
      meter: {
        height: 2,
        borderRadius: 999,
        background: "rgba(255,255,255,0.15)",
        overflow: "hidden",
      } as React.CSSProperties,
      meterFill: {
        height: "100%",
        width: `${Math.round(scrollProgress * 100)}%`,
        background: "rgba(0,255,200,0.9)",
        transition: "width 60ms linear",
      } as React.CSSProperties,
      meterText: {
        marginTop: 8,
        fontSize: 12,
        color: "rgba(255,255,255,0.62)",
      } as React.CSSProperties,

      // --- OVERVIEW SECTION ---
      section: {
        width: "min(1100px, 92vw)",
        margin: "0 auto",
        padding: "72px 0",
      } as React.CSSProperties,
      sectionTitle: {
        fontSize: 18,
        letterSpacing: 1.6,
        textTransform: "uppercase" as const,
        color: "rgba(255,255,255,0.78)",
        margin: 0,
      } as React.CSSProperties,
      cards: {
        marginTop: 18,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 14,
      } as React.CSSProperties,
      card: {
        borderRadius: 18,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.10)",
        padding: 16,
        boxShadow: "0 18px 70px rgba(0,0,0,0.35)",
        minHeight: 170,
      } as React.CSSProperties,
      cardH: {
        fontSize: 14,
        letterSpacing: 1.8,
        textTransform: "uppercase" as const,
        margin: 0,
      } as React.CSSProperties,
      cardP: {
        marginTop: 10,
        color: "rgba(255,255,255,0.72)",
        fontSize: 13,
        lineHeight: 1.5,
        marginBottom: 14,
      } as React.CSSProperties,
      cardLink: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        textDecoration: "none",
        color: "rgba(0,255,200,0.92)",
        fontWeight: 650,
        fontSize: 13,
      } as React.CSSProperties,

      // responsive
      responsiveNote: {
        marginTop: 10,
        color: "rgba(255,255,255,0.55)",
        fontSize: 12,
      } as React.CSSProperties,
    };
  }, [anim, scrollProgress, unlocked]);

  return (
    <div style={styles.page}>
      {/* Fixed “second layer”: header */}
      <header style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.brand}>ASPIS Network</div>
          <nav style={styles.navLinks}>
            <a style={styles.navA} href="#home">
              Главная
            </a>
            <Link style={styles.navA} href="/docs">
              Документы
            </Link>
            <Link style={styles.navA} href="/security">
              Безопасность
            </Link>
            <Link style={styles.navA} href="/deploy">
              Развертывание
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO: first layer (shield) */}
      <section id="home" ref={heroRef} style={styles.heroSection}>
        <div style={styles.heroSticky}>
          <div style={styles.heroInner}>
            <div style={styles.heroText}>
              <h1 style={styles.h1}>ASPIS NETWORK</h1>
              <div style={styles.subtitle}>
                Autonomous Protocol Shield Infrastructure System — премиальная структура протокола,
                раскрывающаяся при скролле: верхний слой, ядро и нижний слой.
              </div>

              <div style={styles.ctaRow}>
                <a style={styles.primaryBtn} href="#overview" onClick={(e) => { e.preventDefault(); scrollToOverview(); }}>
                  Explore Layers
                </a>
                <Link style={styles.ghostBtn} href="/docs">
                  Whitepaper
                </Link>
              </div>

              <div style={styles.hint}>
                Скроль вниз → щит “разблокируется” → появятся 3 кликабельные части
              </div>
            </div>

            <div style={styles.stage}>
              {/* Base shield visual (your component) */}
              <AspisShield />

              {/* Unlockable interactive labels (no buttons inside until unlock) */}
              <div
                style={{ ...styles.partTop, ...styles.layerClickable }}
                onClick={() => onPickLayer("amo")}
                title="AMO ARMOR"
              >
                <div style={styles.layerTitle}>AMO ARMOR</div>
                <div style={styles.layerDesc}>Reserve management module</div>
                <div style={styles.layerHint}>Нажми, чтобы перейти к описанию</div>
              </div>

              <div
                style={{ ...styles.partCore, ...styles.layerClickable }}
                onClick={() => onPickLayer("core")}
                title="CORE"
              >
                <div style={styles.layerTitle}>CORE</div>
                <div style={styles.layerDesc}>Immutable code (No Owner)</div>
                <div style={styles.layerHint}>Нажми, чтобы перейти к описанию</div>
              </div>

              <div
                style={{ ...styles.partBottom, ...styles.layerClickable }}
                onClick={() => onPickLayer("rsi")}
                title="RSI SHELL"
              >
                <div style={styles.layerTitle}>RSI SHELL</div>
                <div style={styles.layerDesc}>Adaptive volatility protection</div>
                <div style={styles.layerHint}>Нажми, чтобы перейти к описанию</div>
              </div>

              {/* Scroll meter */}
              <div style={styles.meterWrap}>
                <div style={styles.meter}>
                  <div style={styles.meterFill} />
                </div>
                <div style={styles.meterText}>
                  {unlocked ? "Unlocked — tap a layer" : "Scroll to unlock layers"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW: landing blocks below (premium pattern like spacecoin) */}
      <section id="overview" ref={overviewRef} style={styles.section}>
        <h2 style={styles.sectionTitle}>Layer Overview</h2>
        <div style={styles.responsiveNote}>
          Здесь — кратко. На “Подробнее” ведём на отдельные страницы (премиальный паттерн: быстро понять → углубиться).
        </div>

        <div style={styles.cards}>
          <div style={styles.card}>
            <h3 style={styles.cardH}>AMO ARMOR</h3>
            <p style={styles.cardP}>
              Верхняя часть щита. Модуль управления резервами: логика распределения, управление капиталом,
              безопасные правила работы подсистем.
            </p>
            <Link style={styles.cardLink} href="/docs">
              Подробнее → Документы
            </Link>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardH}>CORE</h3>
            <p style={styles.cardP}>
              Ядро протокола. Неизменяемая часть (No Owner): принципы, инварианты, гарантирующие
              устойчивость и предсказуемость системы.
            </p>
            <Link style={styles.cardLink} href="/security">
              Подробнее → Безопасность
            </Link>
          </div>

          <div style={styles.card}>
            <h3 style={styles.cardH}>RSI SHELL</h3>
            <p style={styles.cardP}>
              Нижняя часть щита. Адаптивная защита от волатильности: механизмы стабилизации, реакция на
              рыночные режимы, защита потоков.
            </p>
            <Link style={styles.cardLink} href="/deploy">
              Подробнее → Развертывание
            </Link>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div style={{ height: 80 }} />
    </div>
  );
}
