"use client";

import { useEffect, useState } from "react";

type AspisShieldProps = {
  progress: number;
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

  // Прогресс 0 → щит цельный
  // Прогресс 1 → щит распался

  const split = Math.min(progress, 1);

  return (
    <div style={styles.wrapper}>
      
      {/* Верхняя часть */}
      <div
        style={{
          ...styles.part,
          ...styles.top,
          transform: `translateY(${-120 * split}px)`,
          opacity: 1,
          cursor: unlocked ? "pointer" : "default",
        }}
        onClick={unlocked ? onClickTop : undefined}
      >
        {unlocked && <span style={styles.label}>AMO ARMOR</span>}
      </div>

      {/* Ядро */}
      <div
        style={{
          ...styles.core,
          transform: `scale(${1 - 0.15 * split})`,
          cursor: unlocked ? "pointer" : "default",
        }}
        onClick={unlocked ? onClickCore : undefined}
      >
        {unlocked && <span style={styles.label}>CORE</span>}
      </div>

      {/* Нижняя часть */}
      <div
        style={{
          ...styles.part,
          ...styles.bottom,
          transform: `translateY(${120 * split}px)`,
          opacity: 1,
          cursor: unlocked ? "pointer" : "default",
        }}
        onClick={unlocked ? onClickBottom : undefined}
      >
        {unlocked && <span style={styles.label}>RSI SHELL</span>}
      </div>

    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: "relative",
    width: "420px",
    height: "420px",
    margin: "0 auto",
  },

  part: {
    position: "absolute",
    left: "50%",
    width: "340px",
    height: "90px",
    marginLeft: "-170px",
    borderRadius: "20px",
    background: "rgba(10,40,35,0.6)",
    border: "1px solid rgba(0,255,200,0.3)",
    boxShadow: "0 0 40px rgba(0,255,200,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.4s ease-out",
  },

  top: {
    top: 60,
  },

  bottom: {
    bottom: 60,
  },

  core: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "260px",
    height: "260px",
    marginLeft: "-130px",
    marginTop: "-130px",
    borderRadius: "50%",
    border: "2px solid rgba(0,255,200,0.35)",
    boxShadow: "0 0 60px rgba(0,255,200,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.4s ease-out",
    background: "radial-gradient(circle at center, rgba(0,40,35,0.9), rgba(0,10,8,0.95))",
  },

  label: {
    fontSize: "14px",
    letterSpacing: "2px",
    fontWeight: 600,
    color: "#00ffd0",
  },
};
