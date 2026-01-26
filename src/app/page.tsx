"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import AspisShield from "@/components/AspisShield";

export default function Home() {
  const stageRef = useRef<HTMLDivElement | null>(null);

  // 0..1 — прогресс "первой сцены" (пока шапка уезжает и щит раскрывается)
  const [stageProgress, setStageProgress] = useState(0);

  // Когда щит "разблокировался" (после достижения конца сцены)
  const unlocked = stageProgress >= 0.999;

  // высота сцены: сколько нужно проскроллить, чтобы полностью раскрыть щит и убрать шапку
  const stageScrollPx = useMemo(() => {
    // ~1.15 высоты экрана дает “премиальный” темп
    if (typeof window === "undefined") return 1200;
    return Math.max(900, Math.floor(window.innerHeight * 1.15));
  }, []);

  useEffect(() => {
    let raf = 0;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const update = () => {
      const el = stageRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      // el стоит первым блоком на странице. Его top == 0 при старте.
      // Когда скроллим вниз, rect.top становится отрицательным.
      const scrolled = clamp01((-rect.top) / stageScrollPx);
      const eased = easeOutCubic(scrolled);
      setStageProgress(eased);

      // Управляем шапкой через CSS variables (шапка в layout.tsx, но реагирует на переменные)
      // Прячем вверх и гасим прозрачность.
      const headerHidePx = Math.round(76 * eased); // высота/темп ухода
      const headerOpacity = 1 - eased;

      document.documentElement.style.setProperty("--aspis-header-translate-y", `${-headerHidePx}px`);
      document.documentElement.style.setProperty("--aspis-header-opacity", `${headerOpacity}`);
      document.documentElement.style.setProperty("--aspis-header-blur", `${Math.round(10 * eased)}px`);

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [stageScrollPx]);

  return (
    <main style={styles.page}>
      {/* СЦЕНА 1: "двухслойный" первый экран со скролл-анимацией */}
      <section ref={stageRef} style={{ ...styles.stage, height: `calc(100vh + ${stageScrollPx}px)` }}>
        <div style={styles.sticky}>
          {/* Левый контент (первый слой смысловой), щит справа (второй слой визуальный) */}
          <div style={styles.heroGrid}>
            <div style={styles.heroLeft}>
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

              <div style={styles.helper}>
                Скролл вниз — шапка исчезнет, щит “разблокируется” и раскроется на 3 части
              </div>
            </div>

            <div style={styles.heroRight}>
              <AspisShield
                progress={stageProgress}
                unlocked={unlocked}
                // клики по частям щита:
                onClickTop={() => {
                  // вариант 1: ведем на секцию-карточку (лендинг)
                  document.getElementById("overview")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                onClickCore={() => {
                  document.getElementById("overview")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                onClickBottom={() => {
                  document.getElementById("overview")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              />
            </div>
          </div>

          {/* Индикатор прогресса сцены */}
          <div style={styles.progressWrap}>
            <div style={styles.progressLine} />
            <div style={{ ...styles.progressFill, width: `${Math.round(stageProgress * 100)}%` }} />
            <div style={styles.progressText}>{unlocked ? "Unlocked — tap a layer" : "Scroll to unlock layers"}</div>
          </div>
        </div>
      </section>

      {/* СЦЕНА 2: лендинг блоки (после того как щит раскрылся) */}
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
                Верхняя часть щита. Управление резервами и капиталом: правила распределения,
                устойчивость, контроль потоков и баланс.
              </div>
              <a href="/docs" style={styles.cardLink}>
                Подробнее →
              </a>
              <div style={styles.cardHint}>Сейчас временно ведём на /docs (позже переименуем маршруты под слои).</div>
            </div>

            <div style={styles.card}>
              <div style={styles.cardTitle}>CORE</div>
              <div style={styles.cardText}>
                Ядро протокола. Неизменяемая часть (No Owner): инварианты, принципы,
                гарантии устойчивости и предсказуемости системы.
              </div>
              <a href="/security" style={styles.cardLink}>
                Подробнее →
              </a>
              <div style={styles.cardHint}>Сейчас временно ведём на /security (позже переименуем).</div>
            </div>

            <div style={styles.card}>
              <div style={styles.cardTitle}>RSI SHELL</div>
              <div style={styles.cardText}>
                Нижняя часть щита. Адаптивная защита от волатильности: стабилизация,
                реакция на режимы рынка, защита потоков.
              </div>
              <a href="/deploy" style={styles.cardLink}>
                Подробнее →
              </a>
              <div style={styles.cardHint}>Сейчас временно ведём на /deploy (позже переименуем).</div>
            </div>
          </div>

          <div style={styles.footerLine}>© 2026 ASPIS Network — Adaptive Stability Primitive</div>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(1200px 800px at 30% 35%, rgba(0,255,200,0.08), transparent 55%), #05070d",
    color: "#fff",
    overflowX: "hidden",
  },

  // Сцена 1
  stage: {
    position: "relative",
  },
  sticky: {
    position: "sticky",
    top: 0,
    height: "100vh",
    display: "flex",
    alignItems: "center",
    padding: "96px 20px 48px",
  },
  heroGrid: {
    width: "min(1200px, 100%)",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr",
    gap: 28,
    alignItems: "center",
  },
  heroLeft: {
    maxWidth: 540,
  },
  heroRight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
  },
  ctaRow: {
    display: "flex",
    gap: 12,
    marginTop: 12,
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
    maxWidth: 520,
  },

  progressWrap: {
    position: "absolute",
    right: 20,
    bottom: 28,
    width: "min(520px, 45vw)",
    height: 20,
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

  // Сцена 2
  overview: {
    padding: "70px 20px 64px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    background:
      "radial-gradient(900px 600px at 20% 10%, rgba(0,255,200,0.07), transparent 60%), radial-gradient(800px 500px at 80% 20%, rgba(0,160,255,0.05), transparent 55%), #05070d",
  },
  overviewInner: {
    width: "min(1200px, 100%)",
    margin: "0 auto",
  },
  overviewHeader: {
    marginBottom: 18,
  },
  overviewKicker: {
    letterSpacing: 2,
    color: "rgba(255,255,255,0.45)",
    fontSize: 12,
    marginBottom: 6,
  },
  overviewSub: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 14,
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 16,
    marginTop: 18,
  },
  card: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
    padding: 18,
    backdropFilter: "blur(10px)",
    minHeight: 210,
  },
  cardTitle: {
    fontWeight: 700,
    letterSpacing: 2,
    fontSize: 14,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 13,
    lineHeight: 1.65,
    color: "rgba(255,255,255,0.75)",
    minHeight: 110,
  },
  cardLink: {
    display: "inline-block",
    marginTop: 10,
    color: "rgba(0,255,200,0.85)",
    textDecoration: "none",
    fontWeight: 700,
  },
  cardHint: {
    marginTop: 6,
    fontSize: 11,
    color: "rgba(255,255,255,0.40)",
  },
  footerLine: {
    marginTop: 28,
    textAlign: "center",
    color: "rgba(255,255,255,0.45)",
    fontSize: 13,
  },
};

