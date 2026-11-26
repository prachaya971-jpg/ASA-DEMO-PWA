import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0038D1", // คงแถบด้านบนเป็นสีน้ำเงินเดิม
};

export const metadata: Metadata = {
  title: "ASA | สถาปนิก'70",
  description: "ARCHITECT'70 UNHEARD HEIGHTS - 27 APR – 02 MAY 2027",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent", // ให้แถบบนทะลุเห็นสีน้ำเงิน และแถบล่างทะลุเห็นสีดำ
    title: "ASA'70",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" style={{ backgroundColor: "#000000" }}>
      <body
        className={`${inter.className} ${notoSansThai.className}`}
        style={{
          backgroundColor: "#000000",
          color: "#FFFFFF",
          margin: 0,
          padding: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}