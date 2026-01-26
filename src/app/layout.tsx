import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

export const metadata = {
  title: "ASPIS Network",
  description: "Adaptive Stability Primitive",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
