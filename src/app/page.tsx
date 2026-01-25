import AspisShield from "../components/AspisShield";

export default function Page() {
  return (
    <main style={styles.main} id="home">
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.kicker}>PRE-MAINNET</div>
          <h1 style={styles.title}>ASPIS NETWORK</h1>
          <p style={styles.subtitle}>
            Autonomous Protocol Shield Infrastructure System — layered defense
            for protocol-grade stability.
          </p>
          <div style={styles.note}>
            Scroll to unlock layers. Tap a layer to explore its role.
          </div>
        </div>

        {/* Shield = слой 1 (фон/сцена), текст = слой 2 */}
        <div style={styles.shieldStage}>
          <AspisShield />
        </div>
      </section>

      {/* DIVIDER */}
      <section style={styles.divider} />

      {/* LAYER PREVIEWS (лендинг-превью) */}
      <section style={styles.section} id="docs">
        <h2 style={styles.h2}>Layer Overview</h2>
        <p style={styles.p}>
          The shield splits into three layers. Each layer is an entry point into
          the architecture — high-level here, deep detail on dedicated pages.
        </p>

        <div style={styles.grid}>
          {/* AMO */}
          <div style={styles.card} id="amo">
            <div style={styles.cardHeader}>
              <div style={styles.badge}>AMO ARMOR</div>
              <div style={styles.cardMeta}>Reserves & market operations</div>
            </div>
            <p style={styles.cardText}>
              Policy-driven reserve management layer. Optimizes collateral
              posture, liquidity routing, and stress absorbtion under
              predefined constraints.
            </p>
            <a style={styles.cardLink} href="/amo">
              Learn more →
            </a>
          </div>

          {/* CORE */}
          <div style={styles.card} id="core">
            <div style={styles.cardHeader}>
              <div style={styles.badge}>CORE</div>
              <div style={styles.cardMeta}>Immutable / No Owner</div>
            </div>
            <p style={styles.cardText}>
              The immutable heart of the system. Deterministic rules, fixed
              emergency thresholds, and a security posture designed to minimize
              governance risk.
            </p>
            <a style={styles.cardLink} href="/core">
              Learn more →
            </a>
          </div>

          {/* RSI */}
          <div style={styles.card} id="rsi">
            <div style={styles.cardHeader}>
              <div style={styles.badge}>RSI SHELL</div>
              <div style={styles.cardMeta}>Adaptive stability response</div>
            </div>
            <p style={styles.cardText}>
              Adaptive volatility insulation. Reacts to market conditions and
              oracle signals to keep behavior stable under turbulence without
              breaking determinism.
            </p>
            <a style={styles.cardLink} href="/rsi">
              Learn more →
            </a>
          </div>
        </div>
      </section>

      {/* EXTRA SPACE (чтобы эффект щита точно был заметен на телефоне/планшете) */}
      <section style={styles.buffer}>
        <div style={styles.bufferInner}>
          <h2 style={styles.h2} id="security">
            Security posture
          </h2>
          <p style={styles.p}>
            Formal verification gate, immutable core, hardened oracle interface,
            and a layered architecture designed for auditability.
          </p>

          <div style={{ height: 520 }} />

          <h2 style={styles.h2} id="deploy">
            Deployment readiness
          </h2>
          <p style={styles.p}>
            Reproducible build snapshot, contract size checks (EIP-170), CI
            pipeline, and an audit submission pack as the final pre-mainnet
            gate.
          </p>

          <div style={{ height: 420 }} />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={{ opacity: 0.75 }}>
            © {new Date().getFullYear()} ASPIS Network
          </div>
          <div style={styles.footerLinks}>
            <a style={styles.footerLink} href="#home">
              Top
            </a>
            <a style={styles.footerLink} href="#docs">
              Layers
            </a>
            <a style={styles.footerLink} href="#security">
              Security
            </a>
            <a style={styles.footerLink} href="#deploy">
              Deploy
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    background:
      "radial-gradient(900px 400px at 50% 0%, rgba(0,255,200,0.10), rgba(5,10,18,0) 60%), linear-gradient(180deg, #050a12 0%, #070b14 50%, #050a12 100%)",
    color: "#eaffff",
    paddingTop: 84, // фикс-хедер
  },

  hero: {
    maxWidth: 980,
    margin: "0 auto",
    padding: "10px 16px 0",
  },

  heroInner: {
    textAlign: "center",
    paddingTop: 6,
  },

  kicker: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    letterSpacing: 1.2,
    fontSize: 12,
    opacity: 0.9,
  },

  title: {
    margin: "14px 0 0",
    fontSize: 46,
    fontWeight: 900,
    letterSpacing: 2,
  },

  subtitle: {
    margin: "10px auto 0",
    maxWidth: 720,
    fontSize: 15,
    lineHeight: 1.6,
    opacity: 0.85,
  },

  note: {
    marginTop: 12,
    fontSize: 13,
    opacity: 0.75,
  },

  shieldStage: {
    marginTop: 18,
  },

  divider: {
    height: 1,
    maxWidth: 980,
    margin: "26px auto 0",
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
  },

  section: {
    maxWidth: 980,
    margin: "0 auto",
    padding: "44px 16px 20px",
  },

  h2: {
    margin: "0 0 12px",
    letterSpacing: 0.6,
    fontSize: 22,
  },

  p: {
    margin: "0 0 18px",
    lineHeight: 1.8,
    opacity: 0.86,
    maxWidth: 820,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 14,
    marginTop: 18,
  },

  card: {
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.03)",
    padding: 16,
    boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
  },

  cardHeader: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: 10,
  },

  badge: {
    display: "inline-block",
    width: "fit-content",
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,255,200,0.22)",
    background: "rgba(0,255,200,0.08)",
    letterSpacing: 1.1,
    fontWeight: 800,
    fontSize: 12,
  },

  cardMeta: {
    fontSize: 13,
    opacity: 0.75,
  },

  cardText: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.65,
    opacity: 0.9,
    minHeight: 88,
  },

  cardLink: {
    display: "inline-block",
    marginTop: 12,
    padding: "10px 12px",
    borderRadius: 12,
    textDecoration: "none",
    color: "#eaffff",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
  },

  buffer: {
    padding: "30px 0 0",
  },

  bufferInner: {
    maxWidth: 980,
    margin: "0 auto",
    padding: "0 16px 0",
  },

  footer: {
    marginTop: 30,
    borderTop: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.02)",
  },

  footerInner: {
    maxWidth: 980,
    margin: "0 auto",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },

  footerLinks: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },

  footerLink: {
    color: "#eaffff",
    textDecoration: "none",
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(255,255,255,0.03)",
    opacity: 0.9,
  },
};
