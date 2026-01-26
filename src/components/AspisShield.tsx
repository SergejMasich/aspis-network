"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  onUnlocked?: () => void;
};

export default function AspisShield({ onUnlocked }: Props) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [progress, setProgress] = useState(0); // 0..1
  const [unlocked, setUnlocked] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const root = rootRef.current;
      if (!root) return;

      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // прогресс считаем так: когда щит примерно по центру экрана — начинаем “раскрытие”
      // и растягиваем анимацию на ~0.9 высоты экрана
      const start = vh * 0.25;
      const span = vh * 0.9;
      const raw = (start - rect.top) / span;
      const p = clamp(raw, 0, 1);

      setProgress(p);

      if (p >= 1 && !firedRef.current) {
        firedRef.current = true;
        setUnlocked(true);
        onUnlocked?.();
      } else if (p < 1) {
        setUnlocked(false);
        firedRef.current = false;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onUnlocked]);

  const split = useMemo(() => {
    // расстояние “разъезда” частей
    const d = 90 * easeOutCubic(progress);
    const glow = progress >= 1 ? 1 : progress * 0.6;

    return { d, glow };
  }, [progress]);

  const go = (path: string) => router.push(path);

  return (
    <div ref={rootRef} style={styles.wrap} aria-label="Aspis Shield">
      {/* flowing lines (фон “потоков”) */}
      <div style={styles.flows} aria-hidden="true">
        <div style={{ ...styles.flow, ...styles.flowA }} />
        <div style={{ ...styles.flow, ...styles.flowB }} />
        <div style={{ ...styles.flow, ...styles.flowC }} />
      </div>

      {/* shield group */}
      <div style={styles.stage}>
        {/* Top part */}
        <button
          type="button"
          onClick={() => unlocked && go("/layers/amo-armor")}
          style={{
            ...styles.part,
            ...styles.top,
            transform: `translateY(${-split.d}px)`,
            opacity: 1,
            cursor: unlocked ? "pointer" : "default",
          }}
          aria-disabled={!unlocked}
        >
          <div style={{ ...styles.card, opacity: unlocked ? 1 : 0 }}>
            <div style={styles.cardT}>AMO ARMOR</div>
            <div style={styles.cardS}>Reserve management module</div>
            <div style={styles.cardH}>Нажми, чтобы перейти к описанию</div>
          </div>
        </button>

        {/* Core (center) */}
        <button
          type="button"
          onClick={() => unlocked && go("/layers/core")}
          style={{
            ...styles.part,
            ...styles.core,
            boxShadow: `0 0 ${40 + split.glow * 60}px rgba(0,255,200,${0.10 + split.glow * 0.22})`,
            cursor: unlocked ? "pointer" : "default",
          }}
          aria-disabled={!unlocked}
        >
          <div style={{ ...styles.card, opacity: unlocked ? 1 : 0 }}>
            <div style={styles.cardT}>CORE</div>
            <div style={styles.cardS}>Immutable code (No Owner)</div>
            <div style={styles.cardH}>Нажми, чтобы перейти к описанию</div>
          </div>
        </button>

        {/* Bottom part */}
        <button
          type="button"
          onClick={() => unlocked && go("/layers/rsi-shell")}
          style={{
            ...styles.part,
            ...styles.bottom,
            transform: `translateY(${split.d}px)`,
            cursor: unlocked ? "pointer" : "default",
          }}
          aria-disabled={!unlocked}
        >
          <div style={{ ...styles.card, opacity: unlocked ? 1 : 0 }}>
            <div style={styles.cardT}>RSI SHELL</div>
            <div style={styles.cardS}>Adaptive volatility protection</div>
            <div style={styles.cardH}>Нажми, чтобы перейти к описанию</div>
          </div>
        </button>

        {/* outline */}
        <div
          style={{
            ...styles.ring,
            boxShadow: `0 0 ${30 + split.glow * 70}px rgba(0,255,200,${0.08 + split.glow * 0.20})`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* progress bar text */}
      <div style={styles.progressWrap} aria-hidden="true">
        <div style={styles.progressLine}>
          <div style={{ ...styles.progressFill, width: `${Math.round(progress * 100)}%` }} />
        </div>
        <div style={styles.progressText}>
          {unlocked ? "Unlocked — tap a layer" : "Scroll to unlock layers"}
        </div>
      </div>
    </div>
  );
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    position: "relative",
    width: "min(560px, 92vw)",
    height: "min(560px, 92vw)",
  },

  flows: {
    position: "absolute",
    inset: 0,
    borderRadius: 999,
    overflow: "hidden",
    filter: "blur(0.2px)",
    opacity: 0.9,
  },
  flow: {
    position: "absolute",
    left: "8%",
    right: "8%",
    height: 2,
    background:
      "linear-gradient(90deg, rgba(0,255,200,0), rgba(0,255,200,0.45), rgba(0,255,200,0))",
    animation: "aspisFlow 2.2s linear infinite",
  },
  flowA: { top: "38%", animationDelay: "0s" },
  flowB: { top: "50%", animationDelay: "0.6s" },
  flowC: { top: "62%", animationDelay: "1.2s" },

  stage: {
    position: "absolute",
    inset: 0,
    display: "grid",
    placeItems: "center",
  },

  ring: {
    position: "absolute",
    width: "74%",
    height: "74%",
    borderRadius: 999,
    border: "10px solid rgba(210,255,245,0.12)",
    boxShadow: "0 0 40px rgba(0,255,200,0.14)",
  },

  part: {
    position: "absolute",
    width: "76%",
    height: "22%",
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(14px)",
    boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
    padding: 0,
    outline: "none",
  },
  top: { top: "18%" },
  bottom: { bottom: "18%" },
  core: {
    width: "68%",
    height: "18%",
    borderRadius: 999,
    border: "1px solid rgba(0,255,200,0.22)",
    background: "rgba(0,255,200,0.08)",
  },

  card: {
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    padding: "10px 14px",
    transition: "opacity 240ms ease",
  },
  cardT: {
    fontSize: 12,
    letterSpacing: 3,
    fontWeight: 800,
    opacity: 0.92,
  },
  cardS: {
    marginTop: 6,
    fontSize: 12,
    opacity: 0.78,
  },
  cardH: {
    marginTop: 6,
    fontSize: 12,
    opacity: 0.6,
  },

  progressWrap: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: -40,
    width: "72%",
    display: "grid",
    gap: 8,
    justifyItems: "center",
    opacity: 0.85,
  },
  progressLine: {
    width: "100%",
    height: 2,
    background: "rgba(255,255,255,0.12)",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "rgba(0,255,200,0.75)",
    borderRadius: 999,
    transition: "width 80ms linear",
  },
  progressText: {
    fontSize: 12,
    opacity: 0.75,
  },
};

// keyframes (inline)
if (typeof document !== "undefined" && !document.getElementById("aspis-keyframes")) {
  const style = document.createElement("style");
  style.id = "aspis-keyframes";
  style.textContent = `
    @keyframes aspisFlow {
      0% { transform: translateX(-22%); opacity: 0.15; }
      35% { opacity: 0.55; }
      100% { transform: translateX(22%); opacity: 0.15; }
    }
  `;
  document.head.appendChild(style);
}
