"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import { ChevronLeft } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() && !phone.trim()) {
      setErrorMsg("Please enter your email or mobile number.");
      return;
    }
    setErrorMsg("");
    const contact = email.trim() || phone.trim();
    router.push(`/otp?contact=${encodeURIComponent(contact)}`);
  };

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
      {/* Container หลัก (มือถือเต็มจอ / คอมพิวเตอร์จัดกึ่งกลางสัดส่วน 430px) */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "430px",
          minHeight: "100dvh",
          backgroundColor: "#000000",
          display: "flex",
          flexDirection: "column",
          paddingTop: "max(20px, env(safe-area-inset-top, 20px))",
          paddingBottom: "36px",
          paddingLeft: "24px",
          paddingRight: "24px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* 1. แสงฟุ้งมุมขวาบน: Vector.png */}
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
            userSelect: "none",
            zIndex: 0,
          }}
        />

        {/* 2. แสงฟุ้งฝั่งซ้ายกลาง: Vector (1).png */}
        <img
          src="/images/Vector (1).png"
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            top: "80px",
            left: 0,
            width: "85%",
            height: "auto",
            objectFit: "contain",
            mixBlendMode: "screen",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
        />

        {/* 3. ลายเส้นสถาปัตยกรรมมุมขวาบน: Architectural linework */}
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
            opacity: 0.6,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
        />

        {/* เนื้อหาหลักทั้งหมด */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {/* ปุ่มย้อนกลับวงกลมมุมซ้ายบน */}
          <div style={{ paddingTop: "8px", paddingBottom: "28px" }}>
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="ย้อนกลับ"
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
                transition: "background-color 0.15s ease, transform 0.15s ease",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <ChevronLeft size={22} strokeWidth={2.2} />
            </button>
          </div>

          {/* หัวข้อและคำอธิบาย */}
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "28px",
                fontWeight: 700,
                lineHeight: 1.22,
                letterSpacing: "-0.015em",
                color: "#FFFFFF",
              }}
            >
              For Registered
              <br />
              Architect&rsquo;70 Visitors
            </h1>

            <p
              style={{
                marginTop: "14px",
                marginBottom: 0,
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: 1.48,
                color: "rgba(255, 255, 255, 0.82)",
              }}
            >
              Enter your email or mobile number to receive an
              <br />
              OTP for verification.
            </p>
          </div>

          {/* ฟอร์มกรอก Email / Phone Number และปุ่ม Send OTP */}
          <form
            onSubmit={handleSendOtp}
            noValidate
            style={{
              marginTop: "32px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {/* ช่องกรอก Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value) {
                  setPhone("");
                  setErrorMsg("");
                }
              }}
              style={{
                width: "100%",
                height: "52px",
                paddingLeft: "18px",
                paddingRight: "18px",
                borderRadius: "14px",
                backgroundColor: errorMsg
                  ? "rgba(239, 68, 68, 0.14)"
                  : "rgba(255, 255, 255, 0.22)",
                border: errorMsg
                  ? "1.5px solid #EF4444"
                  : "1px solid rgba(255, 255, 255, 0.16)",
                boxShadow: errorMsg ? "0 0 0 3px rgba(239, 68, 68, 0.18)" : "none",
                color: "#FFFFFF",
                fontSize: "15px",
                fontWeight: 400,
                fontFamily: "inherit",
                outline: "none",
                transition: "all 0.2s ease",
                boxSizing: "border-box",
              }}
            />

            {/* ตัวคั่นเส้นแนวนอนพร้อมคำว่า Or */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginTop: "18px",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "rgba(255, 255, 255, 0.24)",
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.85)",
                }}
              >
                Or
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  backgroundColor: "rgba(255, 255, 255, 0.24)",
                }}
              />
            </div>

            {/* ช่องกรอก Phone Number */}
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (e.target.value) {
                  setEmail("");
                  setErrorMsg("");
                }
              }}
              style={{
                width: "100%",
                height: "52px",
                paddingLeft: "18px",
                paddingRight: "18px",
                borderRadius: "14px",
                backgroundColor: errorMsg
                  ? "rgba(239, 68, 68, 0.14)"
                  : "rgba(255, 255, 255, 0.22)",
                border: errorMsg
                  ? "1.5px solid #EF4444"
                  : "1px solid rgba(255, 255, 255, 0.16)",
                boxShadow: errorMsg ? "0 0 0 3px rgba(239, 68, 68, 0.18)" : "none",
                color: "#FFFFFF",
                fontSize: "15px",
                fontWeight: 400,
                fontFamily: "inherit",
                outline: "none",
                transition: "all 0.2s ease",
                boxSizing: "border-box",
              }}
            />

            {/* ข้อความแจ้งเตือนสีแดงเมื่อไม่กรอกข้อมูล */}
            {errorMsg && (
              <p
                style={{
                  marginTop: "10px",
                  marginBottom: 0,
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#F87171",
                }}
              >
                {errorMsg}
              </p>
            )}

            {/* ปุ่ม Send OTP */}
            <button
              type="submit"
              style={{
                marginTop: errorMsg ? "18px" : "28px",
                width: "100%",
                height: "50px",
                borderRadius: "14px",
                background: "linear-gradient(90deg, #E61919 0%, #80199C 50%, #0044FF 100%)",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.01em",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
                cursor: "pointer",
                transition: "transform 0.15s ease, opacity 0.15s ease",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}