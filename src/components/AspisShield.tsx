"use client";

import React from "react";

export type AspisShieldVariant = "aqua" | "emerald" | "steel";

type Props = {
  variant?: AspisShieldVariant;
  className?: string;
};

export default function AspisShield({ variant = "aqua", className }: Props) {
  const theme = getTheme(variant);

  return (
    <div style={{ ...styles.wrapper, ...theme.wrapper }} className={className}>
      {/* Outer shield */}
      <div style={{ ...styles.outer, ...theme.outer }}>
        {/* Middle shield */}
        <div style={{ ...styles.middle, ...theme.middle }}>
          {/* Inner shield */}
          <div style={{ ...styles.inner, ...theme.inner }}>
            {/* Layers */}
            <div style={{ ...styles.layer, ...styles.layerTop, ...theme.layer }}>
              <div style={styles.layerTitle}>AMO ARMOR</div>
              <div style={styles.layerSubtitle}>Reserve management module</div>
            </div>

            <div style={{ ...styles.layer, ...styles.layerMid, ...theme.layer }}>
              <div style={styles.layerTitle}>RSI SHELL</div>
              <div style={styles.layerSubtitle}>Adaptive volatility protection</div>
            </div>

            <div style={{ ...styles.layer, ...styles.layerBottom, ...theme.layer }}>
              <div style={styles.layerTitle}>CORE</div>
              <div style={styles.layerSubtitle}>Immutable code (No Owner)</div>
            </div>

            {/* Core */}
            <div style={{ ...styles.core, ...theme.core }}>
              <div style={{ ...styles.corePulse, ...theme.corePulse }} />
              <div style={styles.coreDot} />
            </div>
          </div>
        </div>
      </div>

      <div style={styles.hint}>Scroll to expand layers</div>
    </div>
  );
}

function getTheme(variant: AspisShieldVariant) {
  switch (variant) {
    case "emerald":
      return {
        wrapper: { filter: "drop-shadow(0 20px 60px rgba(16,185,129,.25))" },
        outer: { background: "linear-gradient(180deg, #0b3b2e 0%, #07261f 100%)" },
        middle: { borderColor: "rgba(16,185,129,.35)" },
        inner: { background: "radial-gradient(circle at 50% 40%, rgba(16,185,129,.22), rgba(0,0,0,.35))" },
        layer: { background: "rgba(6,95,70,.22)", borderColor: "rgba(16,185,129,.28)" },
        core: { borderColor: "rgba(16,185,129,.55)" },
        corePulse: { boxShadow: "0 0 40px rgba(16,185,129,.45)" },
      };
    case "steel":
      return {
        wrapper: { filter: "drop-shadow(0 20px 60px rgba(148,163,184,.22))" },
        outer: { background: "linear-gradient(180deg, #1f2937 0%, #0f172a 100%)" },
        middle: { borderColor: "rgba(148,163,184,.35)" },
        inner: { background: "radial-gradient(circle at 50% 40%, rgba(148,163,184,.18), rgba(0,0,0,.35))" },
        layer: { background: "rgba(51,65,85,.22)", borderColor: "rgba(148,163,184,.22)" },
        core: { borderColor: "rgba(148,163,184,.55)" },
        corePulse: { boxShadow: "0 0 40px rgba(148,163,184,.35)" },
      };
    case "aqua":
    default:
      return {
        wrapper: { filter: "drop-shadow(0 20px 60px rgba(56,189,248,.25))" },
        outer: { background: "linear-gradient(180deg, #0b1a2a 0%, #070a12 100%)" },
        middle: { borderColor: "rgba(56,189,248,.35)" },
        inner: { background: "radial-gradient(circle at 50% 40%, rgba(56,189,248,.22), rgba(0,0,0,.35))" },
        layer: { background: "rgba(8,47,73,.22)", borderColor: "rgba(56,189,248,.25)" },
        core: { borderColor: "rgba(56,189,248,.55)" },
        corePulse: { boxShadow: "0 0 40px rgba(56,189,248,.45)" },
      };
  }
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: "relative",
    width: "min(520px, 92vw)",
    aspectRatio: "3 / 4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  },

  outer: {
    width: "100%",
    height: "100%",
    borderRadius: "28px 28px 44px 44px",
    border: "1px solid rgba(255,255,255,.12)",
    padding: 18,
  },

  middle: {
    width: "100%",
    height: "100%",
    borderRadius: "22px 22px 38px 38px",
    border: "1px solid rgba(255,255,255,.10)",
    padding: 16,
  },

  inner: {
    width: "100%",
    height: "100%",
    borderRadius: "18px 18px 32px 32px",
    border: "1px solid rgba(255,255,255,.08)",
    padding: 16,
    position: "relative",
    overflow: "hidden",
  },

  layer: {
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,.10)",
    padding: "12px 14px",
    backdropFilter: "blur(8px)",
  },

  layerTop: { position: "absolute", top: 18, left: 18, right: 18 },
  layerMid: { position: "absolute", top: 96, left: 18, right: 18 },
  layerBottom: { position: "absolute", bottom: 98, left: 18, right: 18 },

  layerTitle: {
    fontSize: 14,
    letterSpacing: 1.2,
    fontWeight: 700,
    color: "rgba(255,255,255,.92)",
  },

  layerSubtitle: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 1.25,
    color: "rgba(255,255,255,.70)",
  },

  core: {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 140,
    height: 140,
    transform: "translate(-50%, -50%)",
    borderRadius: "999px",
    border: "2px solid rgba(255,255,255,.18)",
    background: "radial-gradient(circle at 50% 40%, rgba(255,255,255,.10), rgba(0,0,0,.55))",
    display: "grid",
    placeItems: "center",
  },

  corePulse: {
    position: "absolute",
    inset: -10,
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,.14)",
    animation: "aspispulse 2.2s ease-in-out infinite",
  },

  coreDot: {
    width: 14,
    height: 14,
    borderRadius: "999px",
    background: "rgba(255,255,255,.85)",
    boxShadow: "0 0 18px rgba(255,255,255,.35)",
  },

  hint: {
    position: "absolute",
    bottom: -28,
    width: "100%",
    textAlign: "center",
    fontSize: 12,
    color: "rgba(255,255,255,.65)",
  },
};
