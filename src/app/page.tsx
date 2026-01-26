import AspisShield from "@/components/AspisShield";

export default function Home() {
  return (
    <main style={styles.page}>
      {/* Scroll stage: 1 экран закреплён (hero+щит), дальше — landing section */}
      <section style={styles.stage}>
        <div style={styles.sticky}>
          <div style={styles.heroGrid}>
            <div style={styles.heroLeft}>
              <h1 style={styles.h1}>ASPIS NETWORK</h1>
              <p style={styles.lead}>
                Autonomous Protocol Shield Infrastructure System — премиальная
                структура протокола, раскрывающаяся при скролле: верхний слой,
                ядро и нижний слой.
              </p>

              <div style={styles.ctaRow}>
                <a href="#overview" style={{ ...styles.cta, ...styles.ctaPrimary }}>
                  Explore Layers
                </a>
                <a href="/docs" style={{ ...styles.cta, ...styles.ctaSecondary }}>
                  Whitepaper
                </a>
              </div>

              <div style={styles.helper}>
                Скролл вниз → щит “разблокируется” → появятся 3 кликабельные части
              </div>
            </div>

            <div style={styles.heroRight}>
              {/* AspisShield сам “живет” в скролле окна; мы просто держим его на первом экране */}
              <AspisShield
                onUnlocked={() => {
                  // после unlock мягко прокручиваем к блоку обзора
                  const el = document.getElementById("overview");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              />
            </div>
          </div>

          <div style={styles.scrollHintWrap}>
            <div style={styles.scrollLine} />
            <div style={styles.scrollText}>Scroll to unlock layers</div>
          </div>
        </div>
      </section>

      {/* Landing / overview */}
      <section id="overview" style={styles.overview}>
        <div style={styles.overviewInner}>
          <h2 style={styles.h2}>LAYER OVERVIEW</h2>
          <p style={styles.overviewLead}>
            Здесь — кратко. Ниже “углубление”: отдельные страницы по каждому слою
            (премиальный паттерн: быстро понять → углубиться).
          </p>

          <div style={styles.cards}>
            <a href="/layers/amo-armor" style={styles.card}>
              <div style={styles.cardTitle}>AMO ARMOR</div>
              <div style={styles.cardText}>
                Верхняя часть щита. Модуль управления резервами: логика
                распределения, управление капиталом, безопасные правила работы подсистем.
              </div>
              <div style={styles.cardLink}>Подробнее → AMO ARMOR</div>
            </a>

            <a href="/layers/core" style={styles.card}>
              <div style={styles.cardTitle}>CORE</div>
              <div style={styles.cardText}>
                Ядро протокола. Неизменяемая часть (No Owner): принципы, инварианты,
                гарантирующие устойчивость и предсказуемость системы.
              </div>
              <div style={styles.cardLink}>Подробнее → CORE</div>
            </a>

            <a href="/layers/rsi-shell" style={styles.card}>
              <div style={styles.cardTitle}>RSI SHELL</div>
              <div style={styles.cardText}>
                Нижняя часть щита. Адаптивная защита от волатильности: механизмы
                стабилизации, реакция на рыночные режимы, защита потоков.
              </div>
              <div style={styles.cardLink}>Подробнее → RSI SHELL</div>
            </a>
          </div>

          <div style={styles.footerNote}>© 2026 ASPIS Network — Adaptive Stability Primitive</div>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(1200px 700px at 70% 20%, rgba(0,255,200,0.12), transparent 60%), #05070b",
    color: "#fff",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  },

  // Делает “первый экран” липким, чтобы щит и hero были в одном слое
  stage: {
    minHeight: "180vh",
    position: "relative",
  },
  sticky: {
    position: "sticky",
    top: 0,
    height: "100vh",
    overflow: "hidden",
    padding: "96px 28px 28px", // сверху место под шапку
  },
  heroGrid: {
    height: "100%",
    display: "grid",
    gridTemplateColumns: "1.05fr 1fr",
    gap: 28,
    alignItems: "center",
  },
  heroLeft: {
    maxWidth: 640,
  },
  heroRight: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  h1: {
    fontSize: 56,
    letterSpacing: 3,
    margin: "0 0 14px 0",
    fontWeight: 500,
  },
  lead: {
    margin: 0,
    opacity: 0.85,
    lineHeight: 1.5,
    fontSize: 16,
    maxWidth: 520,
  },
  ctaRow: {
    display: "flex",
    gap: 12,
    marginTop: 18,
    alignItems: "center",
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    padding: "0 18px",
    borderRadius: 999,
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600,
    border: "1px solid rgba(255,255,255,0.14)",
    backdropFilter: "blur(10px)",
  },
  ctaPrimary: {
    background: "rgba(0,255,200,0.22)",
    boxShadow: "0 0 30px rgba(0,255,200,0.18)",
    color: "#eafffb",
  },
  ctaSecondary: {
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.9)",
  },
  helper: {
    marginTop: 16,
    fontSize: 13,
    opacity: 0.6,
  },

  scrollHintWrap: {
    position: "absolute",
    right: 34,
    bottom: 26,
    width: 260,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "flex-end",
    pointerEvents: "none",
    opacity: 0.75,
  },
  scrollLine: {
    width: 260,
    height: 1,
    background: "linear-gradient(90deg, rgba(0,255,200,0.0), rgba(0,255,200,0.55), rgba(0,255,200,0.0))",
  },
  scrollText: {
    fontSize: 12,
    opacity: 0.75,
  },

  overview: {
    padding: "80px 24px 60px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    background: "linear-gradient(180deg, rgba(5,7,11,0.0), rgba(5,7,11,0.85) 20%, rgba(5,7,11,1) 70%)",
  },
  overviewInner: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  h2: {
    margin: 0,
    fontSize: 18,
    letterSpacing: 2.4,
    fontWeight: 600,
    opacity: 0.85,
  },
  overviewLead: {
    marginTop: 10,
    marginBottom: 26,
    maxWidth: 720,
    opacity: 0.65,
    lineHeight: 1.55,
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 16,
  },
  card: {
    display: "block",
    textDecoration: "none",
    color: "inherit",
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.04)",
    padding: 18,
    boxShadow: "0 20px 70px rgba(0,0,0,0.35)",
    backdropFilter: "blur(14px)",
  },
  cardTitle: {
    fontSize: 14,
    letterSpacing: 2,
    fontWeight: 700,
    marginBottom: 10,
  },
  cardText: {
    opacity: 0.72,
    lineHeight: 1.55,
    fontSize: 13,
    minHeight: 82,
  },
  cardLink: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: 700,
    color: "rgba(0,255,200,0.85)",
  },
  footerNote: {
    marginTop: 46,
    textAlign: "center",
    opacity: 0.45,
    fontSize: 13,
  },
};
