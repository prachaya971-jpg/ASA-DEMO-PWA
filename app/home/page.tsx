"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import { ChevronLeft, User, ShieldCheck } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700", "800"],
});

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const contactParam = searchParams.get("contact");

  // ถ้าส่ง ?role=member มาจากหน้า OTP จะแสดงเป็น Member ถ้าไม่ใช่จะแสดงเป็น Guest
  const isMember = roleParam === "member";

  return (
    <div
      className={`${inter.className} ${notoSansThai.className}`}
      style={{
        minHeight: "100dvh",
        width: "100%",
        backgroundColor: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#FFFFFF",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Container หลัก 430px */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "430px",
          minHeight: "100dvh",
          backgroundColor: "#000000",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: "max(20px, env(safe-area-inset-top, 20px))",
          paddingBottom: "36px",
          paddingLeft: "24px",
          paddingRight: "24px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* แสงฟุ้งพื้นหลัง */}
        <img
          src="/images/Vector.png"
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "85%",
            height: "auto",
            objectFit: "contain",
            mixBlendMode: "screen",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <img
          src="/images/architectural-linework.png"
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "260px",
            height: "auto",
            objectFit: "contain",
            opacity: 0.5,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* เนื้อหาด้านบน */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* ปุ่มกลับไปหน้าแรก */}
          <div style={{ paddingTop: "8px", paddingBottom: "24px" }}>
            <button
              type="button"
              onClick={() => router.push("/")}
              aria-label="กลับหน้าแรก"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255, 255, 255, 0.14)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                cursor: "pointer",
              }}
            >
              <ChevronLeft size={22} strokeWidth={2.2} />
            </button>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            ARCHITECT&rsquo;70 HOME (MOCK)
          </p>

          {/* การ์ดแสดงสถานะ Guest หรือ Member ชัดๆ */}
          <div
            style={{
              marginTop: "20px",
              padding: "28px 24px",
              borderRadius: "20px",
              background: isMember
                ? "linear-gradient(135deg, rgba(230, 25, 25, 0.22) 0%, rgba(128, 25, 156, 0.22) 50%, rgba(0, 68, 255, 0.25) 100%)"
                : "rgba(255, 255, 255, 0.1)",
              border: isMember
                ? "1.5px solid rgba(168, 85, 247, 0.5)"
                : "1.5px solid rgba(255, 255, 255, 0.18)",
              backdropFilter: "blur(14px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: isMember
                  ? "linear-gradient(135deg, #E61919 0%, #80199C 50%, #0044FF 100%)"
                  : "#242426",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isMember ? <ShieldCheck size={30} /> : <User size={30} />}
            </div>

            <div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  backgroundColor: isMember ? "#E6195E" : "rgba(255,255,255,0.16)",
                  color: "#FFFFFF",
                }}
              >
                CURRENT ROLE
              </span>

              <h1
                style={{
                  margin: "12px 0 4px 0",
                  fontSize: "36px",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                }}
              >
                {isMember ? "Member" : "Guest"}
              </h1>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.78)",
                }}
              >
                {isMember
                  ? contactParam
                    ? `เข้าสู่ระบบด้วย: ${contactParam}`
                    : "เข้าสู่ระบบผ่านการยืนยัน OTP สำเร็จ"
                  : "เข้าใช้งานในฐานะบุคคลทั่วไป (ไม่ได้ล็อกอิน)"}
              </p>
            </div>
          </div>
        </div>

        {/* ปุ่มด้านล่างสำหรับทดสอบสลับไปหน้าแรกหรือเข้าสู่ระบบ */}
        <div style={{ position: "relative", zIndex: 1 }}>
          {!isMember ? (
            <button
              type="button"
              onClick={() => router.push("/login")}
              style={{
                width: "100%",
                height: "50px",
                borderRadius: "14px",
                background: "linear-gradient(90deg, #E61919 0%, #80199C 50%, #0044FF 100%)",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "inherit",
                border: "none",
                cursor: "pointer",
              }}
            >
              Login as Member
            </button>
          ) : (
            <button
              type="button"
              onClick={() => router.push("/")}
              style={{
                width: "100%",
                height: "50px",
                borderRadius: "14px",
                backgroundColor: "#242426",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: 600,
                fontFamily: "inherit",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout (กลับหน้า Intro)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100dvh", backgroundColor: "#000000" }} />}>
      <HomeContent />
    </Suspense>
  );
}