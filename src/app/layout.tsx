import "./globals.css";

export const metadata = {
  title: "ASPIS Network",
  description: "Adaptive Stability Primitive",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
