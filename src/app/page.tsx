"use client";

import React, { useEffect, useRef, useState } from "react";
import AspisShield from "@/components/AspisShield";

export default function Home() {

  const stageRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  const unlocked = progress >= 0.98;

  useEffect(() => {
    const onScroll = () => {
      const el = stageRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollPx = window.innerHeight * 1.2;
      const p = Math.min(1, Math.max(0, -rect.top / scrollPx));
      setProgress(p);

      // уезжает шапка
      const header = document.querySelector("header");
      if (header) {
        header.style.transform = `translateY(${ -80 * p }px)`;
        header.style.opacity = `${1 - p}`;
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main style={styles.page}>

      {/* Сцена раскрытия */}
      <section ref={stageRef} style={{ height: "200vh", position: "relative" }}>
        <div style={styles.sticky}>

          <div style={styles.grid}>

            <div>
              <h1 style={styles.h1}>ASPIS NETWORK</h1>
              <p style={styles.lead}>
                Autonomous Protocol Shield Infrastructure System — <br/>
                верхний слой, ядро и нижний слой раскрываются при скролле.
              </p>
              <div style={styles.helper}>
                Скролл вниз — шапка уезжает вверх, щит раскрывается.
              </div>
            </div>

            <AspisShield
              progress={progress}
              unlocked={unlocked}
              onClickTop={() => document.getElementById("overview")?.scrollIntoView({behavior:"smooth"})}
              onClickCore={() => document.getElementById("overview")?.scrollIntoView({behavior:"smooth"})}
              onClickBottom={() => document.getElementById("overview")?.scrollIntoView({behavior:"smooth"})}
            />

          </div>
        </div>
      </section>

      {/* Лендинг блок */}
      <section id="overview" style={styles.overview}>
        <h2 style={styles.h2}>LAYER OVERVIEW</h2>

        <div style={styles.cards}>

          <div style={styles.card}>
            <b>AMO ARMOR</b>
            <p>Управление резервами и капиталом.</p>
            <a href="/docs">Подробнее →</a>
          </div>

          <div style={styles.card}>
            <b>CORE</b>
            <p>Неизменяемое ядро протокола.</p>
            <a href="/security">Подробнее →</a>
          </div>

          <div style={styles.card}>
            <b>RSI SHELL</b>
            <p>Адаптивная защита от волатильности.</p>
            <a href="/deploy">Подробнее →</a>
          </div>

        </div>
      </section>

    </main>
  );
}


const styles: Record<string, React.CSSProperties> = {

  page: {
    background: "#05070d",
    color: "white",
    minHeight: "100vh",
  },

  sticky: {
    position: "sticky",
    top: 0,
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  grid: {
    width: "min(1100px,100%)",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 40,
    alignItems: "center",
    padding: 20,
  },

  h1: {
    fontSize: 54,
    margin: 0,
  },

  lead: {
    marginTop: 18,
    opacity: 0.8,
    lineHeight: 1.6,
  },

  helper: {
    marginTop: 10,
    fontSize: 13,
    opacity: 0.6,
  },

  overview: {
    padding: "80px 20px",
    textAlign: "center",
  },

  h2: {
    fontSize: 36,
  },

  cards: {
    marginTop: 30,
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 18,
  },

  card: {
    border: "1px solid rgba(0,255,200,0.25)",
    borderRadius: 14,
    padding: 18,
    background: "rgba(0,255,200,0.04)",
  },
};
