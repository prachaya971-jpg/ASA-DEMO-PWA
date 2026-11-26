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
  viewportFit: "cover", // <-- เพิ่มบรรทัดนี้เพื่อให้พื้นที่ปุ่มโฮมด้านล่างเป็นสีดำสนิท
  themeColor: "#0038D1", // <-- ด้านบนยังคงเป็นสีน้ำเงินเหมือนเดิม
};

export const metadata: Metadata = {
  title: "ASA | สถาปนิก'70",
  description: "ARCHITECT'70 UNHEARD HEIGHTS - 27 APR – 02 MAY 2027",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "สถาปนิก'70",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${inter.className} ${notoSansThai.className} bg-black text-white antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}