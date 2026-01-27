"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import AspisShield from "@/components/AspisShield";

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Home() {
  const stageRef = useRef<HTMLDivElement | null>(null);

  const [heroP, setHeroP] = useState(0); // уход шапки
  const [shieldP, setShieldP] = useState(0); // раскрытие щита

  // Длины этапов (в пикселях) считаем от высоты экрана
  const lengths = useMemo(() => {
    if (typeof window === "undefined") return { hero: 700, shield: 900, hold: 420, total: 2020 };
    const vh = window.innerHeight || 900;
    const hero = Math.max(560, Math.round(vh * 0.75));   // шапка уезжает
    const shield = Math.max(760, Math.round(vh * 1.05)); // раскрытие щита
    const hold = Math.max(260, Math.round(vh * 0.45));   // “пауза” на полностью раскрытом щите
    return { hero, shield, hold, total: hero + shield + hold };
  }, []);

  const unlocked = shieldP >= 0.999;

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const el = stageRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrolledPx = Math.max(0, -rect.top);

      // 1) HERO
      const h = clamp01(scrolledPx / lengths.hero);
      const hero = easeOutCubic(h);

      // 2) SHIELD — начинается сразу после завершения HERO
      const s = clamp01((scrolledPx - lengths.hero) / lengths.shield);
      const shield = easeInOutCubic(s);

      setHeroP(hero);
      setShieldP(shield);

      // (если у тебя в layout.tsx шапка завязана на CSS переменные — оставляем, но теперь только heroP)
      const headerHidePx = Math.round(110 * hero);
      const headerOpacity = 1 - hero;
      document.documentElement.style.setProperty("--aspis-header-translate-y", `${-headerHidePx}px`);
      document.documentElement.style.setProperty("--aspis-header-opacity", `${headerOpacity}`);
      document.documentElement.style.setProperty("--aspis-header-blur", `${Math.round(10 * hero)}px`);

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [lengths.hero, lengths.shield]);

  return (
    <main style={styles.page}>
      {/* СЦЕНА 1: pinned */}
      <section
        ref={stageRef}
        style={{
          ...styles.stage,
          height: `calc(100vh + ${lengths.total}px)`,
        }}
      >
        <div style={styles.sticky}>
          {/* HERO слой (на весь экран, по центру) */}
          <div
            style={{
              ...styles.heroLayer,
              opacity: 1 - heroP,
              transform: `translateY(${-heroP * 120}px)`,
              pointerEvents: heroP > 0.85 ? "none" : "auto",
            }}
          >
            <div style={styles.heroInner}>
              <div style={styles.brandKicker}>ASPIS Network</div>
              <h1 style={styles.h1}>ASPIS NETWORK</h1>

              <p style={styles.lead}>
                Autonomous Protocol Shield Infrastructure System —
                <br />
                премиальная структура протокола, раскрывающаяся при скролле:
                <br />
                верхний слой, ядро и нижний слой.
              </p>

              <div style={styles.ctaRow}>
                <a href="#overview" style={{ ...styles.cta, ...styles.ctaPrimary }}>
                  Explore Layers
                </a>
                <a href="/docs" style={{ ...styles.cta, ...styles.ctaSecondary }}>
                  Whitepaper
                </a>
              </div>

              <div style={styles.helper}>Scroll вниз — шапка исчезнет, затем щит раскроется на 3 части.</div>
            </div>
          </div>

          {/* SHIELD слой (всегда по центру) */}
          <div style={styles.shieldLayer}>
            <AspisShield
              progress={shieldP}
              unlocked={unlocked}
              onClickTop={() => document.getElementById("overview")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              onClickCore={() => document.getElementById("overview")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              onClickBottom={() => document.getElementById("overview")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            />
          </div>

          {/* Прогресс (можешь оставить) */}
          <div style={styles.progressWrap}>
            <div style={styles.progressLine} />
            <div style={{ ...styles.progressFill, width: `${Math.round((heroP * 0.35 + shieldP * 0.65) * 100)}%` }} />
            <div style={styles.progressText}>{unlocked ? "Unlocked — tap a layer" : "Scroll to unlock layers"}</div>
          </div>
        </div>
      </section>

      {/* СЦЕНА 2: блоки появляются только ПОСЛЕ полной сцены (и после hold) */}
      <section id="overview" style={styles.overview}>
        <div style={styles.overviewInner}>
          <div style={styles.overviewHeader}>
            <div style={styles.overviewKicker}>LAYER OVERVIEW</div>
            <div style={styles.overviewSub}>
              Здесь — кратко. “Подробнее” ведёт на отдельные страницы (паттерн: быстро понять → углубиться).
            </div>
          </div>

          <div style={styles.cards}>
            <div style={styles.card}>
              <div style={styles.cardTitle}>AMO ARMOR</div>
              <div style={styles.cardText}>
                Верхняя часть щита. Управление резервами и капиталом: правила распределения, устойчивость, контроль потоков и баланс.
              </div>
              <a href="/docs" style={styles.cardLink}>Подробнее →</a>
            </div>

            <div style={styles.card}>
              <div style={styles.cardTitle}>CORE</div>
              <div style={styles.cardText}>
                Ядро протокола. Неизменяемая часть (No Owner): инварианты, принципы, гарантии устойчивости и предсказуемости системы.
              </div>
              <a href="/security" style={styles.cardLink}>Подробнее →</a>
            </div>

            <div style={styles.card}>
              <div style={styles.cardTitle}>RSI SHELL</div>
              <div style={styles.cardText}>
                Нижняя часть щита. Адаптивная защита от волатильности: стабилизация, реакция на режимы рынка, защита потоков.
              </div>
              <a href="/deploy" style={styles.cardLink}>Подробнее →</a>
            </div>
          </div>

          <div style={styles.footer}>© 2026 ASPIS Network — Adaptive Stability Primitive</div>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#05070d",
    color: "white",
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

  heroLayer: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    padding: "22px 18px",
    transition: "opacity 120ms linear",
  },
  heroInner: {
    width: "min(980px, 92vw)",
  },
  brandKicker: {
    fontSize: 13,
    letterSpacing: 1.5,
    color: "rgba(255,255,255,0.55)",
    marginBottom: 10,
  },
  h1: {
    fontSize: 56,
    letterSpacing: 2,
    lineHeight: 1.02,
    margin: 0,
  },
  lead: {
    marginTop: 18,
    marginBottom: 20,
    color: "rgba(255,255,255,0.82)",
    fontSize: 16,
    lineHeight: 1.6,
    maxWidth: 720,
  },
  ctaRow: {
    display: "flex",
    gap: 12,
    marginTop: 12,
    flexWrap: "wrap",
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    padding: "0 18px",
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 600,
    fontSize: 14,
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(10px)",
    color: "white",
  },
  ctaPrimary: {
    background: "rgba(0, 255, 200, 0.18)",
    boxShadow: "0 10px 30px rgba(0,255,200,0.08)",
  },
  ctaSecondary: {
    background: "rgba(255,255,255,0.06)",
  },
  helper: {
    marginTop: 14,
    fontSize: 13,
    color: "rgba(255,255,255,0.52)",
    maxWidth: 720,
  },

  shieldLayer: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    padding: "18px",
  },

  progressWrap: {
    position: "absolute",
    right: 20,
    bottom: 28,
    width: "min(520px, 45vw)",
    height: 20,
    pointerEvents: "none",
  },
  progressLine: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 10,
    height: 1,
    background: "rgba(255,255,255,0.16)",
  },
  progressFill: {
    position: "absolute",
    left: 0,
    top: 9,
    height: 3,
    background: "rgba(0,255,200,0.7)",
    boxShadow: "0 0 18px rgba(0,255,200,0.35)",
    borderRadius: 999,
  },
  progressText: {
    position: "absolute",
    right: 0,
    top: 0,
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
  },

  overview: {
    padding: "70px 20px 64px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    background:
      "radial-gradient(900px 600px at 20% 10%, rgba(0,255,200,0.07), transparent 60%), radial-gradient(800px 500px at 80% 20%, rgba(0,160,255,0.05), transparent 55%), #05070d",
  },
  overviewInner: {
    width: "min(1100px, 94vw)",
    margin: "0 auto",
  },
  overviewHeader: {
    marginBottom: 22,
  },
  overviewKicker: {
    fontSize: 12,
    letterSpacing: 2.2,
    color: "rgba(255,255,255,0.55)",
    marginBottom: 10,
  },
  overviewSub: {
    color: "rgba(255,255,255,0.75)",
    lineHeight: 1.6,
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 16,
    marginTop: 18,
  },
  card: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(10px)",
    padding: 18,
  },
  cardTitle: {
    fontWeight: 800,
    letterSpacing: 2,
    marginBottom: 8,
  },
  cardText: {
    color: "rgba(255,255,255,0.72)",
    lineHeight: 1.6,
    fontSize: 14,
    minHeight: 86,
  },
  cardLink: {
    display: "inline-flex",
    marginTop: 14,
    color: "rgba(0,255,200,0.85)",
    textDecoration: "none",
    fontWeight: 700,
  },
  footer: {
    marginTop: 26,
    paddingTop: 18,
    borderTop: "1px solid rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.45)",
    fontSize: 13,
  },
};
