export default function Page() {
  return (
    <main style={s.page}>
      <h1 style={s.h1}>CORE</h1>
      <p style={s.p}>
        Ядро протокола (No Owner). Здесь будет полное описание принципов и инвариантов.
      </p>
      <a style={s.a} href="/">← На главную</a>
    </main>
  );
}
const s: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", padding: 28, background: "#05070b", color: "rgba(255,255,255,0.92)" },
  h1: { margin: 0, fontSize: 34, letterSpacing: 0.6 },
  p: { marginTop: 14, maxWidth: 760, lineHeight: 1.65, color: "rgba(255,255,255,0.75)" },
  a: { display: "inline-block", marginTop: 18, color: "rgba(0,255,200,0.75)", textDecoration: "none" },
};
