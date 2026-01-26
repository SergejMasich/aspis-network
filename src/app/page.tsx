"use client";

import React from "react";
import AspisShield from "@/components/AspisShield";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <main style={styles.page}>
      {/* HERO: 1 экран. Слой 1 = щит (внизу), слой 2 = шапка (поверх), текст/CTA тоже поверх */}
      <section style={styles.hero}>
        <SiteHeader overlay />

        <div style={styles.heroGrid}>
          <div style={styles.heroLeft}>
            <h1 style={styles.h1}>ASPIS NETWORK</h1>

            <p style={styles.lead}>
              Autonomous Protocol Shield Infrastructure System —
              премиальная структура протокола, раскрывающаяся при скролле:
              верхний слой, ядро и нижний слой.
            </p>

            <div style={styles.ctaRow}>
              <a href="#layers" style={{ ...styles.cta, ...styles.ctaPrimary }}>
                Explore Layers
              </a>
              <a href="/docs" style={{ ...styles.cta, ...styles.ctaSecondary }}>
                Whitepaper
              </a>
            </div>

            <div style={styles.helper}>
              Скролл вниз → шапка исчезнет, щит “разблокируется” и раскроется на 3 части
            </div>
          </div>

          <div style={styles.heroRight}>
            {/* Щит живёт как фон/анимация.
               Важно: кнопок ВНУТРИ щита нет — активируются только названия частей после unlock */}
            <AspisShield
              onUnlocked={() => {
                // когда щит “разблокировался”, мягко доводим до секции лендинга (как в spacecoin-подобном паттерне)
                const el = document.getElementById("layers");
                el?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />
          </div>
        </div>

        {/* Нижний маркер/индикатор */}
        <div style={styles.scrollHintWrap}>
          <div style={styles.scrollHintLine} />
          <div style={styles.scrollHintText}>Scroll to unlock layers</div>
        </div>
      </section>

      {/* LANDING SECTION: краткое описание 3 частей + “Подробнее” (пока на якоря/страницы-заглушки) */}
      <section id="layers" style={styles.layers}>
        <div style={styles.layersInner}>
          <div style={styles.layersTop}>
            <div style={styles.kicker}>LAYER OVERVIEW</div>
            <div style={styles.layersNote}>
              Здесь — кратко. “Подробнее” ведёт на отдельные страницы (паттерн: быстро понять → углубиться).
            </div>
          </div>

          <div style={styles.cards}>
            <a href="/amo-armor" style={styles.card}>
              <div style={styles.cardTitle}>AMO ARMOR</div>
              <div style={styles.cardText}>
                Верхняя часть щита. Управление резервами и капиталом: правила распределения, устойчивость,
                контроль потоков и баланс.
              </div>
              <div style={styles.cardCta}>Подробнее →</div>
            </a>

            <a href="/core" style={styles.card}>
              <div style={styles.cardTitle}>CORE</div>
              <div style={styles.cardText}>
                Ядро протокола. Неизменяемая часть (No Owner): инварианты, принципы, гарантии устойчивости
                и предсказуемости системы.
              </div>
              <div style={styles.cardCta}>Подробнее →</div>
            </a>

            <a href="/rsi-shell" style={styles.card}>
              <div style={styles.cardTitle}>RSI SHELL</div>
              <div style={styles.cardText}>
                Нижняя часть щита. Адаптивная защита от волатильности: стабилизация, реакция на режимы рынка,
                защита потоков.
              </div>
              <div style={styles.cardCta}>Подробнее →</div>
            </a>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>© 2026 ASPIS Network — Adaptive Stability Primitive</footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#05070b",
    color: "rgba(255,255,255,0.92)",
  },

  hero: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
  },

  heroGrid: {
    position: "relative",
    zIndex: 5,
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr",
    gap: 28,
    padding: "120px 28px 84px",
    alignItems: "center",
  },

  heroLeft: {
    maxWidth: 720,
  },

  heroRight: {
    minHeight: 520,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  h1: {
    margin: 0,
    fontSize: 48,
    letterSpacing: 1.2,
    fontWeight: 650,
  },

  lead: {
    marginTop: 14,
    marginBottom: 22,
    maxWidth: 620,
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.78)",
    fontSize: 16,
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
    fontWeight: 650,
    letterSpacing: 0.2,
    border: "1px solid rgba(255,255,255,0.10)",
    transition: "transform 150ms ease, filter 150ms ease, background 150ms ease",
    userSelect: "none",
  },

  ctaPrimary: {
    background: "rgba(0, 255, 200, 0.18)",
    color: "rgba(255,255,255,0.92)",
    boxShadow: "0 0 40px rgba(0,255,200,0.10)",
  },

  ctaSecondary: {
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.85)",
  },

  helper: {
    marginTop: 18,
    fontSize: 13,
    color: "rgba(255,255,255,0.55)",
  },

  scrollHintWrap: {
    position: "absolute",
    right: 32,
    bottom: 26,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 8,
    zIndex: 6,
    pointerEvents: "none",
  },

  scrollHintLine: {
    width: 220,
    height: 2,
    background: "linear-gradient(90deg, rgba(0,255,200,0.0), rgba(0,255,200,0.55))",
    borderRadius: 999,
  },

  scrollHintText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: 0.2,
  },

  layers: {
    padding: "72px 28px 64px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    background: "radial-gradient(1200px 600px at 20% 0%, rgba(0,255,200,0.06), rgba(0,0,0,0))",
  },

  layersInner: {
    maxWidth: 1100,
    margin: "0 auto",
  },

  layersTop: {
    marginBottom: 22,
  },

  kicker: {
    fontSize: 14,
    letterSpacing: 2.2,
    color: "rgba(255,255,255,0.55)",
  },

  layersNote: {
    marginTop: 10,
    color: "rgba(255,255,255,0.65)",
    fontSize: 14,
    lineHeight: 1.55,
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 14,
  },

  card: {
    display: "block",
    textDecoration: "none",
    padding: 18,
    borderRadius: 18,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 0 40px rgba(0,0,0,0.35)",
    transition: "transform 180ms ease, border-color 180ms ease, background 180ms ease",
    color: "rgba(255,255,255,0.90)",
  },

  cardTitle: {
    fontWeight: 750,
    letterSpacing: 1.4,
    marginBottom: 10,
  },

  cardText: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.70)",
    minHeight: 96,
  },

  cardCta: {
    marginTop: 14,
    fontWeight: 700,
    color: "rgba(0,255,200,0.75)",
  },

  footer: {
    padding: "22px 28px 38px",
    color: "rgba(255,255,255,0.45)",
    fontSize: 13,
    textAlign: "center",
  },
};
