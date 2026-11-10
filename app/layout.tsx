import type { Metadata, Viewport } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import SyncManager from "@/components/SyncManager";

export const metadata: Metadata = {
  title: "DankeDonkey: alemán desde cero",
  description: "Aprendé alemán jugando, con corrección de pronunciación y gramática.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "DankeDonkey", statusBarStyle: "default" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffaf0" },
    { media: "(prefers-color-scheme: dark)", color: "#17150f" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SyncManager />
        <TopBar />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
