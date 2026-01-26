"use client";

import React from "react";

type AspisShieldProps = {
  progress: number;       // 0..1
  unlocked: boolean;
  onClickTop?: () => void;
  onClickCore?: () => void;
  onClickBottom?: () => void;
};

export default function AspisShield({
  progress,
  unlocked,
  onClickTop,
  onClickCore,
  onClickBottom,
}: AspisShieldProps) {

  // вычисляем смещения частей щита
  const split = progress;

  return (
    <div style={styles.wrap}>

      {/* Верхняя часть */}
      <div
        onClick={unlocked ? onClickTop : undefined}
        style={{
          ...styles.part,
          ...styles.top,
          transform: `translateY(${ -80 * split }px)`,
          opacity: unlocked ? 1 : 0.9,
          cursor: unlocked ? "pointer" : "default",
        }}
      >
        AMO ARMOR
      </div>

      {/* Ядро */}
      <div
        onClick={unlocked ? onClickCore : undefined}
        style={{
          ...styles.core,
          boxShadow: unlocked
            ? "0 0 40px rgba(0,255,200,0.9)"
            : "0 0 20px rgba(0,255,200,0.4)",
          cursor: unlocked ? "pointer" : "default",
        }}
      >
        CORE
      </div>

      {/* Нижняя часть */}
      <div
        onClick={unlocked ? onClickBottom : undefined}
        style={{
          ...styles.part,
          ...styles.bottom,
          transform: `translateY(${ 80 * split }px)`,
          opacity: unlocked ? 1 : 0.9,
          cursor: unlocked ? "pointer" : "default",
        }}
      >
        RSI SHELL
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {

  wrap: {
    position: "relative",
    width: 320,
    height: 320,
  },

  core: {
    position: "absolute",
    inset: 40,
    borderRadius: "50%",
    border: "2px solid rgba(0,255,200,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    letterSpacing: 2,
    color: "white",
    background: "rgba(0,255,200,0.05)",
    backdropFilter: "blur(8px)",
    transition: "0.3s",
  },

  part: {
    position: "absolute",
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 14,
    border: "1px solid rgba(0,255,200,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    letterSpacing: 2,
    color: "white",
    background: "rgba(0,255,200,0.06)",
    backdropFilter: "blur(6px)",
    transition: "0.3s",
  },

  top: {
    top: 0,
  },

  bottom: {
    bottom: 0,
  },
};
