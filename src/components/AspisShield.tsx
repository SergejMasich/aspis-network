"use client";

import React from "react";

export default function AspisShield() {
  return (
    <div style={styles.wrapper}>
      {/* Outer shield */}
      <div style={styles.outer}>
        {/* Middle shield */}
        <div style={styles.middle}>
          {/* Inner shield */}
          <div style={styles.inner}>
            {/* Layers */}
            <div style={{ ...styles.layer, ...styles.layerTop }}>
              <div style={styles.layerTitle}>AMO ARMOR</div>
              <div style={styles.layerSubtitle}>
                Reserve management module
              </div>
            </div>

            <div style={{ ...styles.layer, ...styles.layerMid }}>
              <div style={styles.layerTitle}>RSI SHELL</div>
              <div style={styles.layerSubtitle}>
                Adaptive volatility protection
              </div>
            </div>

            <div style={{ ...styles.layer, ...styles.layerBottom }}>
              <div style={styles.layerTitle}>CORE</div>
              <div style={styles.layerSubtitle}>
                Immutable code (No Owner)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.hint}>Scroll to expand layers</div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 0",
  },

  outer: {
    width: 360,
    height: 420,
    borderRadius: "50% 50% 45% 45%",
    background:
      "linear-gradient(180deg, #e5f9f6 0%, #c7e8e3 100%)",
    padding: 18,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
  },

  middle: {
    width: "100%",
    height: "100%",
    borderRadius: "50% 50% 45% 45%",
    background:
      "linear-gradient(180deg, #0b3b3f 0%, #0a2b2f 100%)",
    padding: 14,
  },

  inner: {
    width: "100%",
    height: "100%",
    borderRadius: "50% 50% 45% 45%",
    background:
      "linear-gradient(180deg, #082c30 0%, #041a1d 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 14,
    padding: "40px 26px",
    boxSizing: "border-box",
  },

  layer: {
    borderRadius: 14,
    padding: "18px 16px",
    textAlign: "center",
    color: "#e8ffff",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
    boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
  },

  layerTop: {
    background: "linear-gradient(90deg,#18e2c6,#0aa389)",
  },

  layerMid: {
    background: "linear-gradient(90deg,#6a2ea6,#3e1d66)",
  },

  layerBottom: {
    background: "linear-gradient(90deg,#394049,#1f2328)",
  },

  layerTitle: {
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: 600,
  },

  layerSubtitle: {
    fontSize: 12,
    opacity: 0.85,
    marginTop: 4,
  },

  hint: {
    marginTop: 18,
    fontSize: 12,
    opacity: 0.6,
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  },
};
