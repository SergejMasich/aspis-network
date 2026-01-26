"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import AspisShield from "@/components/AspisShield";

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function Home() {
  const [y, setY] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setY(window.scrollY || 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const metrics = useMemo(() => {
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;

    // Сцена 1: верхний слой (hero + шапка) уезжает вверх и исчезает
    const headerHideDistance = vh * 0.9;

    // Сцена 2: раскрытие щита начинается ПОСЛЕ исчезновения верхнего слоя
    const shieldRevealDistance = vh * 1.2;

    const headerProgress = clamp01(y / headerHideDistance); // 0..1
    const shieldProgress = clamp01((y - headerHideDistance) / shieldRevealDistance); // 0..1

    const stageHeight = headerHideDistance + shieldRevealDistance; // чтобы после раскрытия сразу начинался overview (без “пустоты”)

    return {
      vh,
      headerHideDistance,
      shieldRevealDistance,
      headerProgress,
      shieldProgress,
      stageHeight,
      unlocked: shieldProgress >= 1,
    };
  }, [y]);

  // Управляем шапкой из layout через CSS-переменные (чтобы она реально “уезжала вверх и исчезала”)
  useEffect(() => {
    const shift = -Math.round(metrics.headerProgress * metrics.vh * 1.05); // уезжает вверх
    const opacity = 1 - metrics.headerProgress; // исчезает
    const pe = metrics.headerProgress >= 0.98 ? "none" : "auto";

    document.documentElement.style.setProperty("--aspis-header-shift", `${shift}px`);
    document.documentElement.style.setProperty("--aspis-header-opacity", `${opacity}`);
    document.documentElement.style.setProperty("--aspis-header-pe", pe);

    return () => {
      document.documentElement.style.removeProperty("--aspis-header-shift");
      document.documentElement.style.removeProperty("--aspis-header-opacity");
      document.documentElement.style.removeProperty("--aspis-header-pe");
    };
  }, [metrics.headerProgress, metrics.vh]);

  // Верхний “слой 2” (hero) — тоже уезжает вверх и исчезает
  const heroShift = -Math.round(metrics.headerProgress * metrics.vh * 1.05);
  const heroOpacity = 1 - metrics.headerProgress;

  return (
    <main style={styles.page}>
      {/* СЦЕНА: sticky-экран с 2 слоями (shield снизу, hero+header сверху) */}
      <section style={{ ...styles.stage, height: metrics.stageHeight }}>
        <div style={styles.sticky}>
          {/* Слой 1 — щит на весь экран */}
          <div style={styles.shieldLayer}>
            <AspisShield
              progress={metrics.shieldProgress}
              unlocked={metrics.unlocked}
              onClickTop={() => (window.location.href = "/layers/amo-armor")}
              onClickCore={() => (window.location.href = "/layers/core")}
              onClickBottom={() => (window.location.href = "/layers/rsi-shell")}
            />
          </div>

          {/* Слой 2 — hero на весь экран поверх щита (уезжает вверх и исчезает) */}
          <div
            style={{
              ...styles.heroLayer,
              transform: `translateY(${heroShift}px)`,
              opacity: heroOpacity,
              pointerEvents: heroOpacity < 0.05 ? "none" : "auto",
            }}
          >
            <div style={styles.heroGrid}>
              <div style={styles.heroLeft}>
                <h1 style={styles.h1}>ASPIS NETWORK</h1>
                <p style={styles.lead}>
                  Autonomous Protocol Shield Infrastructure System — премиальная структура протокола,
                  раскрывающаяся при скролле: верхний слой исчезает, затем щит раскрывается на 3 части.
                </p>

                <div style={styles.ctaRow}>
                  <a href="#overview" style={{ ...styles.cta, ...styles.ctaPrimary }}>
                    Explore Layers
                  </a>
                  <a href="/docs" style={{ ...styles.cta, ...styles.ctaSecondary }}>
                    Whitepaper
                  </a>
                </div>

                <div style={styles.helper}>
                  Скролл вниз — сначала исчезнет верхний слой, затем щит “разблокируется” и станет кликабельным.
                </div>
              </div>

              <div style={styles.heroRight}>
                {/* пусто намеренно — щит уже под ним и занимает весь экран */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW сразу после раскрытия (без “чёрной пустоты”) */}
      <section id="overview" style={styles.overview}>
        <div style={styles.overviewInner}>
          <div style={styles.overHead}>LAYER OVERVIEW</div>
          <div style={styles.overSub}>
            Коротко: нажми “Подробнее”, чтобы перейти на отдельную страницу слоя (паттерн “быстро понять → углубиться”).
          </div>

          <div style={styles.cardGrid}>
            <div style={styles.card}>
              <div style={styles.cardTitle}>AMO ARMOR</div>
              <div style={styles.cardText}>
                Верхняя часть щита. Управление резервами и капиталом: правила распределения, устойчивость,
                контроль потоков и баланс.
              </div>
              <a style={styles.more} href="/layers/amo-armor">
                Подробнее →
              </a>
            </div>

            <div style={styles.card}>
              <div style={styles.cardTitle}>CORE</div>
              <div style={styles.cardText}>
                Ядро протокола. Неизменяемая часть (No Owner): инварианты, принципы, гарантии устойчивости
                и предсказуемости системы.
              </div>
              <a style={styles.more} href="/layers/core">
                Подробнее →
              </a>
            </div>

            <div style={styles.card}>
              <div style={styles.cardTitle}>RSI SHELL</div>
              <div style={styles.cardText}>
                Нижняя часть щита. Адаптивная защита от волатильности: стабилизация, реакция на режимы рынка,
                защита потоков.
              </div>
              <a style={styles.more} href="/layers/rsi-shell">
                Подробнее →
              </a>
            </div>
          </div>

          <div style={styles.footerNote}>© 2026 ASPIS Network — Adaptive Stability Primitive</div>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#05070a",
    color: "rgba(255,255,255,0.92)",
  },

  stage: {
    position: "relative",
  },
  sticky: {
    position: "sticky",
    top: 0,
    height: "100vh",
    overflow: "hidden",
  },

  shieldLayer: {
    position: "absolute",
    inset: 0,
  },

  heroLayer: {
    position: "absolute",
    inset: 0,
    zIndex: 10,
    display: "grid",
    placeItems: "center",
    transition: "opacity 120ms linear",
  },

  heroGrid: {
    width: "min(1200px, 92vw)",
    height: "min(760px, 78vh)",
    display: "grid",
    gridTemplateColumns: "1.05fr 0.95fr",
    gap: 28,
    alignItems: "center",
  },
  heroLeft: {
    paddingTop: 40,
  },
  heroRight: {},

  h1: {
    fontSize: 56,
    letterSpacing: 1.5,
    margin: 0,
    lineHeight: 1.05,
  },
  lead: {
    marginTop: 14,
    maxWidth: 520,
    color: "rgba(255,255,255,0.72)",
    lineHeight: 1.6,
    fontSize: 16,
  },
  ctaRow: {
    display: "flex",
    gap: 12,
    marginTop: 18,
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    padding: "0 18px",
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
  },
  ctaPrimary: {
    background: "rgba(0,255,200,0.14)",
    border: "1px solid rgba(0,255,200,0.20)",
    color: "rgba(220,255,245,0.95)",
  },
  ctaSecondary: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    color: "rgba(255,255,255,0.82)",
  },
  helper: {
    marginTop: 14,
    color: "rgba(255,255,255,0.45)",
    fontSize: 13,
    maxWidth: 520,
  },

  overview: {
    padding: "80px 0 90px",
    background:
      "radial-gradient(1200px 700px at 50% 0%, rgba(0,255,200,0.10), rgba(0,0,0,0) 55%), #05070a",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  overviewInner: {
    width: "min(1200px, 92vw)",
    margin: "0 auto",
  },
  overHead: {
    fontSize: 12,
    letterSpacing: 3,
    color: "rgba(255,255,255,0.55)",
  },
  overSub: {
    marginTop: 10,
    color: "rgba(255,255,255,0.62)",
    maxWidth: 780,
    lineHeight: 1.6,
  },
  cardGrid: {
    marginTop: 26,
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 18,
  },
  card: {
    borderRadius: 18,
    padding: 18,
    border: "1px solid rgba(255,255,255,0.08)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
    backdropFilter: "blur(10px)",
    minHeight: 190,
  },
  cardTitle: {
    letterSpacing: 3,
    fontWeight: 800,
    fontSize: 13,
    color: "rgba(255,255,255,0.88)",
  },
  cardText: {
    marginTop: 10,
    color: "rgba(255,255,255,0.68)",
    lineHeight: 1.6,
    fontSize: 14,
  },
  more: {
    display: "inline-block",
    marginTop: 14,
    color: "rgba(0,255,200,0.85)",
    textDecoration: "none",
    fontWeight: 700,
  },
  footerNote: {
    marginTop: 40,
    textAlign: "center",
    color: "rgba(255,255,255,0.40)",
    fontSize: 13,
  },
};
