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
      className={`${inter.className}${notoSansThai.className} login-page-bg`}
      style={{
        position: "relative",
        minHeight: "100dvh",
        width: "100%",
        backgroundColor: "#000000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#FFFFFF",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* CSS Responsive สำหรับ Mobile และ iPad (รวมพื้นหลังเต็มจอ) */}
      <style>{`
        .bg-vector-top {
          position: absolute;
          top: 0;
          right: 0;
          width: 85%;
          max-width: 480px;
          height: auto;
          object-fit: contain;
          mix-blend-mode: screen;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        .bg-vector-left {
          position: absolute;
          top: 80px;
          left: 0;
          width: 85%;
          max-width: 480px;
          height: auto;
          object-fit: contain;
          mix-blend-mode: screen;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        .bg-linework {
          position: absolute;
          top: 0;
          right: 0;
          width: 260px;
          height: auto;
          object-fit: contain;
          opacity: 0.6;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        .login-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 430px;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          padding-top: max(20px, env(safe-area-inset-top, 20px));
          padding-bottom: 36px;
          padding-left: 24px;
          padding-right: 24px;
          box-sizing: border-box;
        }

        .login-back-wrap {
          padding-top: 8px;
          padding-bottom: 28px;
        }

        .login-back-btn {
          width: 40px;
          height: 40px;
        }

        .login-title {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          line-height: 1.22;
          letter-spacing: -0.015em;
          color: #FFFFFF;
        }

        .login-subtitle {
          margin-top: 14px;
          margin-bottom: 0;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.48;
          color: rgba(255, 255, 255, 0.82);
        }

        .login-form {
          margin-top: 32px;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .login-input {
          width: 100%;
          height: 52px;
          padding-left: 18px;
          padding-right: 18px;
          border-radius: 14px;
          font-size: 15px;
        }

        .login-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 18px;
          margin-bottom: 18px;
        }

        .login-btn {
          height: 50px;
          font-size: 16px;
        }

        /* ================= iPad / Tablet (>= 768px) ================= */
        @media (min-width: 768px) {
          .bg-vector-top {
            width: 65%;
            max-width: 760px;
          }

          .bg-vector-left {
            top: 120px;
            width: 65%;
            max-width: 760px;
          }

          .bg-linework {
            width: 420px;
          }

          .login-container {
            max-width: 620px;
            padding-top: 40px;
            padding-bottom: 48px;
            padding-left: 44px;
            padding-right: 44px;
          }

          .login-back-wrap {
            padding-bottom: 36px;
          }

          .login-back-btn {
            width: 46px;
            height: 46px;
          }

          .login-title {
            font-size: 36px;
          }

          .login-subtitle {
            font-size: 16px;
            margin-top: 16px;
          }

          .login-form {
            margin-top: 40px;
          }

          .login-input {
            height: 58px;
            padding-left: 22px;
            padding-right: 22px;
            border-radius: 16px;
            font-size: 16px;
          }

          .login-divider {
            margin-top: 22px;
            margin-bottom: 22px;
          }

          .login-btn {
            height: 56px;
            font-size: 17px;
          }
        }
      `}</style>

      {/* พื้นหลังเต็มหน้าจอ (ไม่โดนตัดขอบบน iPad) */}
      <img src="/images/Vector.png" alt="" draggable={false} className="bg-vector-top" />
      <img src="/images/Vector (1).png" alt="" draggable={false} className="bg-vector-left" />
      <img src="/images/architectural-linework.png" alt="" draggable={false} className="bg-linework" />

      {/* Container เนื้อหาหลัก */}
      <div className="login-container">
        {/* ปุ่มย้อนกลับวงกลมมุมซ้ายบน */}
        <div className="login-back-wrap">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="ย้อนกลับ"
            className="login-back-btn"
            style={{
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
          <h1 className="login-title">
            For Registered
            <br />
            Architect&rsquo;70 Visitors
          </h1>

          <p className="login-subtitle">
            Enter your email or mobile number to receive an
            <br />
            OTP for verification.
          </p>
        </div>

        {/* ฟอร์มกรอก Email / Phone Number และปุ่ม Send OTP */}
        <form onSubmit={handleSendOtp} noValidate className="login-form">
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
            className="login-input"
            style={{
              backgroundColor: errorMsg
                ? "rgba(239, 68, 68, 0.14)"
                : "rgba(255, 255, 255, 0.22)",
              border: errorMsg
                ? "1.5px solid #EF4444"
                : "1px solid rgba(255, 255, 255, 0.16)",
              boxShadow: errorMsg ? "0 0 0 3px rgba(239, 68, 68, 0.18)" : "none",
              color: "#FFFFFF",
              fontWeight: 400,
              fontFamily: "inherit",
              outline: "none",
              transition: "all 0.2s ease",
              boxSizing: "border-box",
            }}
          />

          <div className="login-divider">
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.24)" }} />
            <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255, 255, 255, 0.85)" }}>
              Or
            </span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255, 255, 255, 0.24)" }} />
          </div>

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
            className="login-input"
            style={{
              backgroundColor: errorMsg
                ? "rgba(239, 68, 68, 0.14)"
                : "rgba(255, 255, 255, 0.22)",
              border: errorMsg
                ? "1.5px solid #EF4444"
                : "1px solid rgba(255, 255, 255, 0.16)",
              boxShadow: errorMsg ? "0 0 0 3px rgba(239, 68, 68, 0.18)" : "none",
              color: "#FFFFFF",
              fontWeight: 400,
              fontFamily: "inherit",
              outline: "none",
              transition: "all 0.2s ease",
              boxSizing: "border-box",
            }}
          />

          {errorMsg && (
            <p style={{ marginTop: "10px", marginBottom: 0, fontSize: "13px", fontWeight: 500, color: "#F87171" }}>
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="login-btn"
            style={{
              marginTop: errorMsg ? "18px" : "28px",
              width: "100%",
              borderRadius: "14px",
              background: "linear-gradient(90deg, #E61919 0%, #80199C 50%, #0044FF 100%)",
              color: "#FFFFFF",
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
  );
}