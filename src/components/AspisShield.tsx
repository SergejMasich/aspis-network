"use client";

import React, { useEffect, useMemo, useState } from "react";

type Props = {
  /** 0..1 — прогресс раскрытия щита (начинается после исчезновения hero) */
  progress: number;
  /** true когда щит полностью раскрылся */
  unlocked: boolean;

  onClickTop?: () => void;
  onClickCore?: () => void;
  onClickBottom?: () => void;
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export default function AspisShield({ progress, unlocked, onClickTop, onClickCore, onClickBottom }: Props) {
  const p = clamp01(progress);

  // Подгоняем "разлёт" под экран, чтобы верх/низ реально влезали на мобильных
  const [maxSpread, setMaxSpread] = useState(200);
  useEffect(() => {
    const calc = () => {
      const vh = window.innerHeight || 800;
      // ~18% высоты экрана, но не больше 220 и не меньше 140
      const s = Math.round(Math.max(140, Math.min(220, vh * 0.18)));
      setMaxSpread(s);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const spread = maxSpread * p;

  // Премиальный "свет" растёт по мере прогресса
  const glow = unlocked ? 1 : 0.18 + 0.55 * p;

  // Заголовки верх/низ: проявляются во время разделения (а не только после unlocked)
  const titlesAlpha = useMemo(() => {
    if (unlocked) return 1;
    // старт чуть позже, чтобы не мигало на нуле
    const t = clamp01((p - 0.22) / 0.38);
    // лёгкое easing
    return 1 - Math.pow(1 - t, 2);
  }, [p, unlocked]);

  const canClick = unlocked;

  return (
    <div style={styles.wrap}>
      <div style={styles.bg} />
      <div style={{ ...styles.flow, opacity: 0.35 + 0.35 * (1 - p) }}>
        <div className="flowLine a" />
        <div className="flowLine b" />
        <div className="flowLine c" />
      </div>

      <div style={styles.center}>
        {/* TOP */}
        <button
          type="button"
          onClick={canClick ? onClickTop : undefined}
          style={{
            ...styles.piece,
            ...styles.top,
            transform: `translateY(${-spread}px)`,
            cursor: canClick ? "pointer" : "default",
            opacity: 0.18 + 0.82 * p,
          }}
          aria-label="AMO ARMOR"
        >
          <div
            style={{
              ...styles.pieceInner,
              boxShadow: `0 0 ${18 + 18 * glow}px rgba(0, 255, 200, ${0.12 + 0.25 * glow})`,
              borderColor: `rgba(0,255,200,${0.22 + 0.22 * glow})`,
            }}
          >
            <div
              style={{
                ...styles.title,
                opacity: titlesAlpha,
                transform: titlesAlpha > 0.9 ? "translateY(0)" : "translateY(6px)",
              }}
            >
              AMO ARMOR
            </div>
          </div>
        </button>

        {/* CORE */}
        <button
          type="button"
          onClick={canClick ? onClickCore : undefined}
          style={{ ...styles.coreBtn, cursor: canClick ? "pointer" : "default" }}
          aria-label="CORE"
        >
          <div
            style={{
              ...styles.core,
              boxShadow: `0 0 ${28 + 30 * glow}px rgba(0, 255, 200, ${0.18 + 0.3 * glow})`,
              borderColor: `rgba(0,255,200,${0.22 + 0.3 * glow})`,
              transform: `scale(${0.92 + 0.08 * p})`,
            }}
          >
            <div style={styles.coreLabel}>CORE</div>

            <div
              style={{
                ...styles.coreBeamTop,
                opacity: 0.25 + 0.35 * p,
                height: 40 + 120 * p,
              }}
            />
            <div
              style={{
                ...styles.coreBeamBottom,
                opacity: 0.25 + 0.35 * p,
                height: 40 + 120 * p,
              }}
            />
          </div>
        </button>

        {/* BOTTOM */}
        <button
          type="button"
          onClick={canClick ? onClickBottom : undefined}
          style={{
            ...styles.piece,
            ...styles.bottom,
            transform: `translateY(${spread}px)`,
            cursor: canClick ? "pointer" : "default",
            opacity: 0.18 + 0.82 * p,
          }}
          aria-label="RSI SHELL"
        >
          <div
            style={{
              ...styles.pieceInner,
              boxShadow: `0 0 ${18 + 18 * glow}px rgba(0, 255, 200, ${0.12 + 0.25 * glow})`,
              borderColor: `rgba(0,255,200,${0.22 + 0.22 * glow})`,
            }}
          >
            <div
              style={{
                ...styles.title,
                opacity: titlesAlpha,
                transform: titlesAlpha > 0.9 ? "translateY(0)" : "translateY(-6px)",
              }}
            >
              RSI SHELL
            </div>
          </div>
        </button>

        <div style={{ ...styles.hint, opacity: unlocked ? 0 : 0.55 }}>Scroll to unlock layers</div>
        <div style={{ ...styles.progressTrack, opacity: unlocked ? 0 : 0.65 }}>
          <div style={{ ...styles.progressFill, width: `${Math.round(p * 100)}%` }} />
        </div>
      </div>

      <style jsx>{`
        .flowLine {
          position: absolute;
          left: 10%;
          right: 10%;
          height: 2px;
          background: linear-gradient(
            90deg,
            rgba(0, 255, 200, 0) 0%,
            rgba(0, 255, 200, 0.35) 35%,
            rgba(0, 255, 200, 0.7) 50%,
            rgba(0, 255, 200, 0.35) 65%,
            rgba(0, 255, 200, 0) 100%
          );
          filter: blur(0.2px);
          animation: slide 2.6s linear infinite;
          opacity: 0.9;
        }
        .flowLine.a {
          top: 38%;
          animation-duration: 2.9s;
        }
        .flowLine.b {
          top: 52%;
          animation-duration: 3.3s;
        }
        .flowLine.c {
          top: 66%;
          animation-duration: 3.1s;
        }
        @keyframes slide {
          0% {
            transform: translateX(-12%);
          }
          100% {
            transform: translateX(12%);
          }
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    position: "relative",
    width: "min(720px, 92vw)",
    height: "min(560px, 70vh)",
    borderRadius: 26,
    overflow: "hidden",
  },
  bg: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(900px 600px at 50% 45%, rgba(0,255,200,0.12), transparent 60%), radial-gradient(800px 500px at 30% 20%, rgba(0,160,255,0.06), transparent 55%), #05070d",
    filter: "saturate(1.05)",
  },
  flow: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  center: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
  },
  piece: {
    position: "absolute",
    width: "min(520px, 84vw)",
    height: 110,
    border: "none",
    background: "transparent",
    padding: 0,
  },
  pieceInner: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
    background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(8px)",
    display: "grid",
    placeItems: "center",
  },
  top: {
    top: "calc(50% - 200px)",
  },
  bottom: {
    top: "calc(50% + 150px)",
  },
  title: {
    fontSize: 14,
    letterSpacing: 3,
    color: "rgba(235,255,250,0.92)",
    transition: "opacity 400ms ease, transform 400ms ease",
    fontWeight: 700,
  },
  coreBtn: {
    position: "relative",
    width: "min(360px, 64vw)",
    height: "min(360px, 64vw)",
    border: "none",
    background: "transparent",
    padding: 0,
  },
  core: {
    width: "100%",
    height: "100%",
    borderRadius: 9999,
    border: "1px solid rgba(255,255,255,0.10)",
    background:
      "radial-gradient(circle at 50% 45%, rgba(0,255,200,0.10), rgba(0,0,0,0) 55%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
    backdropFilter: "blur(10px)",
    display: "grid",
    placeItems: "center",
    transition: "transform 250ms ease",
    position: "relative",
    overflow: "hidden",
  },
  coreLabel: {
    fontSize: 16,
    letterSpacing: 4,
    fontWeight: 700,
    color: "rgba(235,255,250,0.92)",
  },
  coreBeamTop: {
    position: "absolute",
    top: 0,
    left: "50%",
    width: 2,
    transform: "translateX(-50%)",
    background: "linear-gradient(180deg, rgba(0,255,200,0.0), rgba(0,255,200,0.55), rgba(0,255,200,0.0))",
    filter: "blur(0.2px)",
  },
  coreBeamBottom: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    width: 2,
    transform: "translateX(-50%)",
    background: "linear-gradient(0deg, rgba(0,255,200,0.0), rgba(0,255,200,0.55), rgba(0,255,200,0.0))",
    filter: "blur(0.2px)",
  },
  hint: {
    position: "absolute",
    bottom: 92,
    right: 36,
    fontSize: 12,
    color: "rgba(230,255,250,0.65)",
    letterSpacing: 1,
    transition: "opacity 200ms ease",
  },
  progressTrack: {
    position: "absolute",
    bottom: 78,
    right: 36,
    width: 320,
    height: 2,
    background: "rgba(255,255,255,0.10)",
    borderRadius: 999,
    overflow: "hidden",
    transition: "opacity 200ms ease",
  },
  progressFill: {
    height: "100%",
    background: "rgba(0,255,200,0.85)",
    borderRadius: 999,
  },
};
