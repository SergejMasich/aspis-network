"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import AspisShield from "@/components/AspisShield";

export default function Home() {
  const stageRef = useRef<HTMLDivElement | null>(null);

  // 0..1 — прогресс раскрытия щита (ВТОРАЯ фаза)
  const [stageProgress, setStageProgress] = useState(0);

  // Когда щит "разблокировался"
  const unlocked = stageProgress >= 0.999;

  // Две фазы скролла:
  // A) шапка уезжает (headerPhase)
  // B) щит раскрывается (shieldPhase) — начинается сразу после A
  const stageConfig = useMemo(() => {
    if (typeof window === "undefined") {
      return { headerScrollPx: 520, shieldScrollPx: 760, totalScrollPx: 1280 };
    }

    // Подбери при желании, но эти значения дают “без пустоты” и быстрый старт раскрытия.
    const headerScrollPx = Math.max(420, Math.floor(window.innerHeight * 0.55));
    const shieldScrollPx = Math.max(520, Math.floor(window.innerHeight * 0.80));
    return {
      headerScrollPx,
      shieldScrollPx,
      totalScrollPx: headerScrollPx + shieldScrollPx,
    };
  }, []);

  useEffect(() => {
    let raf = 0;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const update = () => {
      const el = stageRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const raw = -rect.top; // сколько “проскроллено” внутри stage

      // Фаза A — уход шапки
      const headerPhaseRaw = clamp01(raw / stageConfig.headerScrollPx);
      const headerPhase = easeOutCubic(headerPhaseRaw);

      // Фаза B — раскрытие щита (сразу после A)
      const shieldPhaseRaw = clamp01((raw - stageConfig.headerScrollPx) / stageConfig.shieldScrollPx);
      const shieldPhase = easeOutCubic(shieldPhaseRaw);

      setStageProgress(shieldPhase);

      // Управляем "шапкой" (в layout.tsx) через CSS vars:
      // Уводим вверх до полного исчезновения + гасим
      // (Здесь можно подстроить высоту ухода, но важно: теперь она полностью “заканчивается” до старта щита)
      const headerHidePx = Math.round((window?.innerHeight ? window.innerHeight * 0.45 : 320) * headerPhase);
      const headerOpacity = 1 - headerPhase;

      document.documentElement.style.setProperty("--aspis-header-translate-y", `${-headerHidePx}px`);
      document.documentElement.style.setProperty("--aspis-header-opacity", `${headerOpacity}`);
      document.documentElement.style.setProperty("--aspis-header-blur", `${Math.round(10 * headerPhase)}px`);

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [stageConfig.headerScrollPx, stageConfig.shieldScrollPx]);

  return (
    <main style={styles.page}>
      {/* СЦЕНА 1: первый экран (двухслойный) */}
      <section
        ref={stageRef}
        style={{ ...styles.stage, height: `calc(100vh + ${stageConfig.totalScrollPx}px)` }}
      >
        <div style={styles.sticky}>
          {/* Слой щита (фон/визуал) */}
          <div style={styles.shieldLayer}>
            <AspisShield
              progress={stageProgress}
              unlocked={unlocked}
              onClickTop={() => (window.location.href = "/docs")}
              onClickCore={() => (window.location.href = "/security")}
              onClickBottom={() => (window.location.href = "/deploy")}
            />
          </div>

          {/* Слой шапки (контент поверх) — по центру экрана */}
          <div style={styles.heroLayer}>
            <div style={styles.heroContent}>
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
                Скролл вниз — сначала исчезнет верхний слой, затем щит “разблокируется” и станет кликабельным.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция ниже: появится только ПОСЛЕ полного раскрытия щита (потому что сцена заканчивается ровно на конце фазы B) */}
      <section id="overview" style={styles.overview}>
        <h2 style={styles.overviewTitle}>LAYER OVERVIEW</h2>
        <p style={styles.overviewText}>
          Здесь — кратко. “Подробнее” ведёт на отдельные страницы (паттерн: быстро понять → углубиться).
        </p>

        <div style={styles.cards}>
          <div style={styles.card}>
            <div style={styles.cardTitle}>AMO ARMOR</div>
            <div style={styles.cardText}>
              Верхняя часть щита. Управление резервами и капиталом: правила распределения, устойчивость,
              контроль потоков и баланс.
            </div>
            <a style={styles.more} href="/docs">
              Подробнее →
            </a>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>CORE</div>
            <div style={styles.cardText}>
              Ядро протокола. Неизменяемая часть (No Owner): инварианты, принципы, гарантии устойчивости и
              предсказуемости системы.
            </div>
            <a style={styles.more} href="/security">
              Подробнее →
            </a>
          </div>

          <div style={styles.card}>
            <div style={styles.cardTitle}>RSI SHELL</div>
            <div style={styles.cardText}>
              Нижняя часть щита. Адаптивная защита от волатильности: стабилизация, реакция на режимы рынка,
              защита потоков.
            </div>
            <a style={styles.more} href="/deploy">
              Подробнее →
            </a>
          </div>
        </div>

        <div style={styles.footer}>© 2026 ASPIS Network — Adaptive Stability Primitive</div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(1200px 600px at 50% 55%, rgba(0,255,170,0.14), rgba(0,0,0,0) 60%), #05080b",
    color: "white",
    overflowX: "hidden",
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

  // Щит — отдельный слой
  shieldLayer: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    pointerEvents: "auto",
  },

  // Контент шапки — отдельный слой
  heroLayer: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    zIndex: 2,
    paddingTop: "clamp(24px, 6vh, 72px)",
    pointerEvents: "none", // чтобы клики проходили к щиту (когда разблокирован)
  },

  heroContent: {
    width: "min(920px, 92vw)",
    padding: "0 8px",
    pointerEvents: "auto",
  },

  h1: {
    margin: 0,
    fontSize: "clamp(44px, 7vw, 72px)",
    letterSpacing: "0.08em",
    fontWeight: 700,
  },

  lead: {
    marginTop: 14,
    marginBottom: 18,
    color: "rgba(255,255,255,0.78)",
    fontSize: "clamp(14px, 2vw, 16px)",
    lineHeight: 1.55,
    maxWidth: 700,
  },

  ctaRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginTop: 10,
  },

  cta: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 18px",
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 600,
    border: "1px solid rgba(255,255,255,0.14)",
    backdropFilter: "blur(10px)",
  },

  ctaPrimary: {
    background: "rgba(0, 255, 170, 0.12)",
  },

  ctaSecondary: {
    background: "rgba(255,255,255,0.05)",
  },

  helper: {
    marginTop: 14,
    color: "rgba(255,255,255,0.45)",
    fontSize: 13,
    maxWidth: 760,
  },

  overview: {
    padding: "72px 18px 54px",
    maxWidth: 1100,
    margin: "0 auto",
  },

  overviewTitle: {
    margin: 0,
    fontSize: 14,
    letterSpacing: "0.18em",
    color: "rgba(255,255,255,0.55)",
  },

  overviewText: {
    marginTop: 10,
    marginBottom: 28,
    color: "rgba(255,255,255,0.7)",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 16,
  },

  card: {
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.03)",
    padding: 18,
    minHeight: 180,
  },

  cardTitle: {
    fontWeight: 700,
    letterSpacing: "0.12em",
    marginBottom: 10,
  },

  cardText: {
    color: "rgba(255,255,255,0.7)",
    lineHeight: 1.5,
    fontSize: 14,
  },

  more: {
    display: "inline-flex",
    marginTop: 14,
    color: "rgba(0,255,170,0.8)",
    textDecoration: "none",
    fontWeight: 600,
  },

  footer: {
    marginTop: 40,
    paddingTop: 18,
    borderTop: "1px solid rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.45)",
    fontSize: 13,
    textAlign: "center",
  },
};
