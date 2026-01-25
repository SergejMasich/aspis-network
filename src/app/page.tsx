import React from "react";
import AspisShield from "@/components/AspisShield";

export default function Home() {
  return (
    <main style={styles.main}>
      {/* Hero section */}
      <section style={styles.hero}>
        <h1 style={styles.title}>ASPIS NETWORK</h1>
        <p style={styles.subtitle}>
          Autonomous Protocol Shield Infrastructure System
        </p>

        <div style={styles.buttonRow}>
          <button style={styles.primaryButton}>Enter App</button>
          <button style={styles.secondaryButton}>Whitepaper</button>
        </div>
      </section>

      {/* Shield */}
      <AspisShield />
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #05070d 0%, #0a111c 60%, #05070d 100%)",
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  hero: {
    paddingTop: 80,
    textAlign: "center",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial",
  },

  title: {
    fontSize: 42,
    letterSpacing: 4,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    opacity: 0.75,
    maxWidth: 420,
    margin: "0 auto 26px",
  },

  buttonRow: {
    display: "flex",
    gap: 16,
    justifyContent: "center",
    marginBottom: 40,
  },

  primaryButton: {
    padding: "12px 26px",
    borderRadius: 999,
    background: "#18e2c6",
    border: "none",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },

  secondaryButton: {
    padding: "12px 26px",
    borderRadius: 999,
    background: "transparent",
    border: "1px solid #18e2c6",
    color: "#18e2c6",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
};
