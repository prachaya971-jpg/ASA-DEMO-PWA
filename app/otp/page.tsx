"use client";

import React, { useState, useRef, useEffect } from "react";
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

export default function OtpVerificationPage() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [resendTimer, setResendTimer] = useState<number>(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextOtp = [...otp];
    nextOtp[index] = digit;
    setOtp(nextOtp);
    if (errorMsg) setErrorMsg("");

    if (digit && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (errorMsg) setErrorMsg("");
      if (!otp[index] && index > 0) {
        const prevOtp = [...otp];
        prevOtp[index - 1] = "";
        setOtp(prevOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const nextOtp = [...otp];
        nextOtp[index] = "";
        setOtp(nextOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 5);
    if (!pastedData) return;

    const nextOtp = [...otp];
    pastedData.split("").forEach((char, idx) => {
      if (idx < 5) nextOtp[idx] = char;
    });
    setOtp(nextOtp);
    if (errorMsg) setErrorMsg("");

    const nextFocusIndex = Math.min(pastedData.length, 4);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 5) {
      setErrorMsg("Please enter the complete 5-digit verification code.");
      // โฟกัสไปยังช่องแรกที่ยังว่างอยู่
      const firstEmptyIndex = otp.findIndex((digit) => digit === "");
      if (firstEmptyIndex !== -1) {
        inputRefs.current[firstEmptyIndex]?.focus();
      }
      return;
    }
    setErrorMsg("");
    router.push("/home?role=member");
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setOtp(["", "", "", "", ""]);
    setErrorMsg("");
    setResendTimer(30);
    inputRefs.current[0]?.focus();
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
              OTP Verification
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
              Enter the verification code we sent to your email
              <br />
              address or mobile number.
            </p>
          </div>

          {/* ฟอร์มกรอกรหัส OTP 5 ช่อง + ปุ่ม Verify */}
          <form
            onSubmit={handleVerify}
            noValidate
            style={{
              marginTop: "32px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {/* แถวช่องกรอกรหัส 5 หลัก */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                width: "100%",
              }}
            >
              {otp.map((digit, index) => {
                const isFilled = digit !== "";
                const isBoxError = Boolean(errorMsg) && !isFilled;

                return (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    aria-label={`รหัส OTP หลักที่ ${index + 1}`}
                    style={{
                      width: "100%",
                      maxWidth: "66px",
                      height: "64px",
                      borderRadius: "14px",
                      backgroundColor: isBoxError
                        ? "rgba(239, 68, 68, 0.14)"
                        : isFilled
                        ? "rgba(255, 255, 255, 0.22)"
                        : "rgba(255, 255, 255, 0.15)",
                      border: isBoxError
                        ? "1.5px solid #EF4444"
                        : isFilled
                        ? "1px solid rgba(255, 255, 255, 0.45)"
                        : "1px solid rgba(255, 255, 255, 0.08)",
                      boxShadow: isBoxError
                        ? "0 0 0 3px rgba(239, 68, 68, 0.18)"
                        : "none",
                      color: "#FFFFFF",
                      fontSize: "24px",
                      fontWeight: 600,
                      textAlign: "center",
                      fontFamily: "inherit",
                      outline: "none",
                      transition: "all 0.15s ease",
                      boxSizing: "border-box",
                    }}
                  />
                );
              })}
            </div>

            {/* ข้อความแจ้งเตือนสีแดงเมื่อกรอกรหัสไม่ครบ */}
            {errorMsg && (
              <p
                style={{
                  marginTop: "12px",
                  marginBottom: 0,
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#F87171",
                }}
              >
                {errorMsg}
              </p>
            )}

            {/* ปุ่ม Verify */}
            <button
              type="submit"
              style={{
                marginTop: errorMsg ? "20px" : "32px",
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
              Verify
            </button>

            {/* ข้อความ Didn't receive a code? Resend */}
            <div
              style={{
                marginTop: "24px",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: 500,
                color: "#FFFFFF",
              }}
            >
              <span>Didn&rsquo;t receive a code? </span>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendTimer > 0}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  margin: 0,
                  fontFamily: "inherit",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: resendTimer > 0 ? "rgba(255, 255, 255, 0.45)" : "#E6195E",
                  cursor: resendTimer > 0 ? "default" : "pointer",
                }}
              >
                {resendTimer > 0 ? `Resend (${resendTimer}s)` : "Resend"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}