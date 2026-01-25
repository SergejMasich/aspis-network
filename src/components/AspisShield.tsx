"use client";

import React, { useEffect, useMemo, useState } from "react";

export default function AspisShield() {
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;

      // Диапазон скролла, в котором “раскрывается” щит
      const start = 0;
      const end = 520;

      const p = Math.min(1, Math.max(0, (y - start) / (end - start)));
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Насколько разъехались части щита
  const split = progress;
  const gap = 8 + split * 110;

  // Подписи появляются только ближе к концу
  const labelsOpacity = Math.min(1, Math.max(0, (progress - 0.82) / 0.18));
  const labelsVisible = labelsOpacity > 0.02;

  // Усиление свечения в конце
  const glowPower = Math.min(1, Math.max(0, (progress - 0.75) / 0.25));

  const colors = useMemo(() => {
    const g = glowPower; // 0..1
    return {
      top: `rgba(${Math.round(0 + 40 * g)},${Math.round(
        255 - 40 * g
      )},${Math.round(200 - 40 * g)},${0.12 + 0.10 * g})`,
      bottom: `rgba(${Math.round(140 + 30 * g)},${Math.round(
        90 + 20 * g
      )},${Math.round(255 - 40 * g)},${0.12 + 0.10 * g})`,
      ring: `rgba(0,255,200,${0.10 + 0.10 * g})`,
    };
  }, [glowPower]);

  // Позже можем заменить на роуты /amo /core /rsi
  const go = (hash: string) => {
    if (typeof window === "undefined") return;
    window.location.hash = hash;
  };

  return (
    <div style={wrap}>
      <div style={frame}>
        {/* Верхняя часть — кликабельна после “раскрытия” */}
        <div
          style={{
            ...partBase,
            ...topPart,
            background: colors.top,
            transform: `translate(-50%, -${gap}px)`,
            boxShadow: `0 0 ${16 + glowPower * 26}px rgba(0,255,200,${
              0.08 + glowPower * 0.18
            })`,
          }}
        />
        {/* Хитбокс (чтобы удобно нажимать) */}
        <button
          type="button"
          aria-label="AMO ARMOR"
          onClick={() => go("#amo")}
          style={{
            ...hitboxBase,
            left: "50%",
            top: 90,
            transform: `translate(-50%, -${gap}px)`,
            opacity: labelsOpacity,
            pointerEvents: labelsVisible ? "auto" : "none",
          }}
        >
          <div style={{ ...label, opacity: labelsOpacity }}>
            <div style={labelTitle}>AMO ARMOR</div>
            <div style={labelSub}>Reserve management module</div>
          </div>
        </button>

        {/* Нижняя часть — кликабельна после “раскрытия” */}
        <div
          style={{
            ...partBase,
            ...bottomPart,
            background: colors.bottom,
            transform: `translate(-50%, ${gap}px)`,
            boxShadow: `0 0 ${16 + glowPower * 26}px rgba(160,120,255,${
              0.08 + glowPower * 0.18
            })`,
          }}
        />
        <button
          type="button"
          aria-label="RSI SHELL"
          onClick={() => go("#rsi")}
          style={{
            ...hitboxBase,
            left: "50%",
            bottom: 90,
            transform: `translate(-50%, ${gap}px)`,
            opacity: labelsOpacity,
            pointerEvents: labelsVisible ? "auto" : "none",
          }}
        >
          <div style={{ ...label, opacity: labelsOpacity }}>
            <div style={labelTitle}>RSI SHELL</div>
            <div style={labelSub}>Adaptive volatility protection</div>
          </div>
        </button>

        {/* Потоки (всегда работают) */}
        <div
          className="flowAnim"
          style={{ ...flow, ...flowTop, opacity: 0.55 + split * 0.25 }}
        />
        <div
          className="flowAnim"
          style={{ ...flow, ...flowBottom, opacity: 0.55 + split * 0.25 }}
        />

        {/* Ядро — всегда на месте, но кликабельно только в конце */}
        <div
          style={{
            ...core,
            boxShadow: `0 0 ${22 + glowPower * 40}px rgba(0,255,200,${
              0.10 + glowPower * 0.22
            })`,
            border: `1px solid rgba(255,255,255,${0.10 + glowPower * 0.10})`,
          }}
        >
          <button
            type="button"
            aria-label="CORE"
            onClick={() => go("#core")}
            style={{
              ...coreHit,
              opacity: labelsOpacity,
              pointerEvents: labelsVisible ? "auto" : "none",
            }}
          >
            <div
              style={{
                ...ring,
                background: colors.ring,
                boxShadow: `inset 0 0 ${
                  26 + glowPower * 30
                }px rgba(0,255,200,${0.10 + glowPower * 0.20})`,
              }}
            >
              <div style={dot} />
            </div>

            <div style={{ ...coreLabel, opacity: labelsOpacity }}>
              <div style={labelTitle}>CORE</div>
              <div style={labelSub}>Immutable code (No Owner)</div>
            </div>
          </button>

          <div style={hint}>
            {progress < 0.82 ? "Scroll to expand layers" : "Tap a layer to enter"}
          </div>
        </div>
      </div>

      {/* Анимация потоков */}
      <style jsx>{`
        .flowAnim {
          animation: flowMove 1.25s linear infinite;
        }
        @keyframes flowMove {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 220px 0;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- styles ---------- */

const wrap: React.CSSProperties = {
  marginTop: 22,
  paddingBottom: 18,
};

const frame: React.CSSProperties = {
  position: "relative",
  height: 560,
  borderRadius: 26,
  background:
    "radial-gradient(800px 360px at 50% 30%, rgba(0,255,200,0.10), rgba(5,10,18,0) 55%), linear-gradient(180deg, rgba(10,14,22,0.35), rgba(5,10,18,0.0))",
  border: "1px solid rgba(255,255,255,0.06)",
  overflow: "hidden",
};

const partBase: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  width: 520,
  height: 160,
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  backdropFilter: "blur(6px)",
};

const topPart: React.CSSProperties = {
  top: 90,
};

const bottomPart: React.CSSProperties = {
  bottom: 90,
};

const flow: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  width: 460,
  height: 14,
  transform: "translateX(-50%)",
  borderRadius: 999,
  background:
    "linear-gradient(90deg, rgba(0,255,200,0) 0%, rgba(0,255,200,0.40) 35%, rgba(160,120,255,0.40) 65%, rgba(160,120,255,0) 100%)",
  backgroundSize: "220px 14px",
  filter: "blur(0.2px)",
};

const flowTop: React.CSSProperties = {
  top: 170,
};

const flowBottom: React.CSSProperties = {
  bottom: 170,
};

const core: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  height: 420,
  borderRadius: "50%",
  background: "rgba(0,0,0,0.18)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const ring: React.CSSProperties = {
  width: 280,
  height: 280,
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.10)",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const dot: React.CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: 999,
  background: "rgba(255,255,255,0.85)",
  boxShadow: "0 0 18px rgba(0,255,200,0.35)",
};

/* кликабельные зоны */

const hitboxBase: React.CSSProperties = {
  position: "absolute",
  width: 520,
  height: 160,
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.02)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "opacity 220ms ease",
  padding: 0,
  outline: "none",
};

const coreHit: React.CSSProperties = {
  width: 360,
  height: 360,
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.02)",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  padding: 0,
  outline: "none",
};

const label: React.CSSProperties = {
  textAlign: "center",
  padding: "10px 14px",
  borderRadius: 16,
  background: "rgba(5,10,18,0.55)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 0 18px rgba(0,0,0,0.25)",
};

const coreLabel: React.CSSProperties = {
  textAlign: "center",
  padding: "8px 12px",
  borderRadius: 14,
  background: "rgba(5,10,18,0.45)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
};

const labelTitle: React.CSSProperties = {
  fontWeight: 800,
  letterSpacing: 1.2,
  fontSize: 14,
};

const labelSub: React.CSSProperties = {
  marginTop: 4,
  fontSize: 12,
  opacity: 0.82,
};

const hint: React.CSSProperties = {
  position: "absolute",
  bottom: 18,
  fontSize: 13,
  opacity: 0.75,
  letterSpacing: 0.3,
};
