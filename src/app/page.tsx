import AspisShield from "@/components/AspisShield";
import { useEffect, useMemo, useRef, useState } from "react";

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export default function Home() {
  const stageRef = useRef<HTMLElement | null>(null);

  // 0..1 — общий прогресс сцены (шапка уезжает + щит раскрывается)
  const [stageProgress, setStageProgress] = useState(0);

  // флаги “разблокировано” (когда щит уже в 3 части)
  const unlocked = stageProgress >= 1;

  useEffect(() => {
    const onScroll = () => {
      const stage = stageRef.current;
      if (!stage) return;

      const rect = stage.getBoundingClientRect();
      // сколько пикселей “прокручено” внутри stage
      const scrolledInside = -rect.top;

      // ВАЖНО:
      // Мы делаем stage высотой 200vh:
      // - первые ~100vh: шапка уезжает
      // - вторые ~100vh: щит раскрывается
      //
      // Но чтобы НЕ БЫЛО пустого скролла:
      // - шапка исчезает к 0.5 прогресса
      // - сразу после этого начинается раскрытие

      const stageHeight = stage.offsetHeight;
      const viewport = window.innerHeight;

      // доступная прокрутка внутри stage
      const totalScrollable = Math.max(1, stageHeight - viewport);

      // нормализуем 0..1 по всей сцене
      const p = clamp01(scrolledInside / totalScrollable);

      // Делаем так:
      // - 0..0.45 — шапка уезжает
      // - 0.45..1 — щит раскрывается
      //
      // Это убирает “пустоту”: как только шапка исчезла — щит сразу “пошёл”
      setStageProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Разбиваем stageProgress на два независимых прогресса:
  // headerP: 0..1 (уезжает шапка)
  // shieldP: 0..1 (раскрывается щит)
  const { headerP, shieldP } = useMemo(() => {
    const headerEnd = 0.45; // точка, где шапка уже полностью исчезла
    const headerP = clamp01(stageProgress / headerEnd);
    const shieldP = clamp01((stageProgress - headerEnd) / (1 - headerEnd));
    return { headerP, shieldP };
  }, [stageProgress]);

  // Для “премиального” ощущения: шапка не просто исчезает,
  // а уезжает вверх + слегка растворяется
  const headerStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 24px",
    transform: `translateY(${-headerP * 140}px)`,
    opacity: 1 - headerP * 1.05,
    pointerEvents: headerP >= 1 ? "none" : "auto",
  };

  const page: React.CSSProperties = {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 800px at 50% 55%, rgba(0,255,200,0.10), rgba(0,0,0,0.92) 55%, rgba(0,0,0,0.98))",
    color: "white",
  };

  // сцена (двухслойная)
  const stage: React.CSSProperties = {
    position: "relative",
    height: "200vh", // ключ: “шапка уезжает” + “щит раскрывается”
    overflow: "hidden",
  };

  const sticky: React.CSSProperties = {
    position: "sticky",
    top: 0,
    height: "100vh",
    display: "grid",
    placeItems: "center",
  };

  // Щит всегда по центру и на весь экран (нижний слой)
  const shieldWrap: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
    pointerEvents: headerP < 1 ? "none" : "auto", // пока шапка видна — клики по щиту не нужны
  };

  // Контент шапки — строго центр, никаких “лево/право”
  const heroBox: React.CSSProperties = {
    width: "min(980px, 100%)",
    textAlign: "left",
  };

  const h1: React.CSSProperties = {
    fontSize: "clamp(44px, 6vw, 82px)",
    lineHeight: 1.02,
    letterSpacing: "0.02em",
    margin: 0,
  };

  const lead: React.CSSProperties = {
    marginTop: 16,
    fontSize: "clamp(16px, 1.6vw, 20px)",
    lineHeight: 1.55,
    opacity: 0.82,
    maxWidth: 740,
  };

  const ctaRow: React.CSSProperties = {
    marginTop: 24,
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  };

  const ctaBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    padding: "0 18px",
    borderRadius: 999,
    textDecoration: "none",
    fontWeight: 600,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    backdropFilter: "blur(10px)",
  };

  const ctaPrimary: React.CSSProperties = {
    ...ctaBase,
    background: "rgba(0, 255, 200, 0.14)",
    border: "1px solid rgba(0,255,200,0.30)",
  };

  const helper: React.CSSProperties = {
    marginTop: 16,
    fontSize: 13,
    opacity: 0.6,
  };

  // “Лендинг” блок — сразу после окончания сцены (без пустого экрана)
  const overview: React.CSSProperties = {
    padding: "84px 24px 96px",
  };

  const overviewInner: React.CSSProperties = {
    width: "min(1100px, 100%)",
    margin: "0 auto",
  };

  const cards: React.CSSProperties = {
    marginTop: 22,
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  };

  const card: React.CSSProperties = {
    borderRadius: 20,
    padding: 22,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(10px)",
    minHeight: 210,
  };

  const cardTitle: React.CSSProperties = {
    margin: 0,
    letterSpacing: "0.12em",
    fontSize: 14,
    opacity: 0.9,
  };

  const cardText: React.CSSProperties = {
    marginTop: 12,
    opacity: 0.78,
    lineHeight: 1.55,
    fontSize: 14,
  };

  const more: React.CSSProperties = {
    marginTop: 18,
    display: "inline-flex",
    gap: 8,
    alignItems: "center",
    color: "rgba(0,255,200,0.85)",
    fontWeight: 700,
    textDecoration: "none",
  };

  return (
    <main style={page}>
      {/* Двухслойная сцена */}
      <section ref={stageRef} style={stage}>
        <div style={sticky}>
          {/* Нижний слой: щит (на весь экран, по центру) */}
          <div style={shieldWrap}>
            <AspisShield
              progress={shieldP}
              unlocked={unlocked}
              showAllLabels={shieldP > 0.02} // подписи начинают появляться почти сразу
              onClickTop={() => (window.location.href = "/docs")}
              onClickCore={() => (window.location.href = "/security")}
              onClickBottom={() => (window.location.href = "/deploy")}
            />
          </div>

          {/* Верхний слой: шапка на весь экран */}
          <div style={headerStyle}>
            <div style={heroBox}>
              <h1 style={h1}>Сеть ASPIS</h1>

              <p style={lead}>
                Autonomous Protocol Shield Infrastructure System — премиальная структура протокола,
                раскрывающаяся при скролле: верхний слой, ядро и нижний слой.
              </p>

              <div style={ctaRow}>
                <a href="#overview" style={ctaPrimary}>
                  Изучите слои
                </a>
                <a href="/docs" style={ctaBase}>
                  Белая книга
                </a>
              </div>

              <div style={helper}>
                Скролл вниз — шапка исчезнет, затем щит начнёт раскрываться на 3 части (без “пустого” скролла).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ЛЕНДИНГ сразу после сцены */}
      <section id="overview" style={overview}>
        <div style={overviewInner}>
          <div style={{ opacity: 0.85, letterSpacing: "0.14em", fontSize: 12 }}>
            LAYER OVERVIEW
          </div>
          <div style={{ marginTop: 10, opacity: 0.72, lineHeight: 1.6 }}>
            Здесь — кратко. “Подробнее” ведёт на отдельные страницы (премиальный паттерн: быстро понять → углубиться).
          </div>

          <div style={cards}>
            <div style={card}>
              <h3 style={cardTitle}>AMO ARMOR</h3>
              <div style={cardText}>
                Верхняя часть щита. Управление резервами и капиталом: правила распределения,
                устойчивость, контроль потоков и баланс.
              </div>
              <a style={more} href="/docs">
                Подробнее →
              </a>
            </div>

            <div style={card}>
              <h3 style={cardTitle}>CORE</h3>
              <div style={cardText}>
                Ядро протокола. Неизменяемая часть (No Owner): инварианты, принципы,
                гарантии устойчивости и предсказуемости системы.
              </div>
              <a style={more} href="/security">
                Подробнее →
              </a>
            </div>

            <div style={card}>
              <h3 style={cardTitle}>RSI SHELL</h3>
              <div style={cardText}>
                Нижняя часть щита. Адаптивная защита от волатильности: стабилизация,
                реакция на режимы рынка, защита потоков.
              </div>
              <a style={more} href="/deploy">
                Подробнее →
              </a>
            </div>
          </div>

          <div style={{ marginTop: 64, opacity: 0.55, textAlign: "center", fontSize: 12 }}>
            © 2026 ASPIS Network — Adaptive Stability Primitive
          </div>
        </div>
      </section>

      {/* адаптивность для 3 карточек */}
      <style jsx global>{`
        @media (max-width: 980px) {
          #overview > div > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
