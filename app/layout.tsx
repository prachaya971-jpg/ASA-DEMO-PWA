import type { Metadata, Viewport } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "ASA Platform Demo",
  description: "ตัวอย่างระบบ ASA Platform",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ASA Demo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${prompt.className} bg-slate-50 text-slate-900 antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}