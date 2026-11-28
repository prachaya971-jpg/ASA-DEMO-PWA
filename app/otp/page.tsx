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

        .otp-container {
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

        .otp-back-wrap {
          padding-top: 8px;
          padding-bottom: 28px;
        }

        .otp-back-btn {
          width: 40px;
          height: 40px;
        }

        .otp-title {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          line-height: 1.22;
          letter-spacing: -0.015em;
          color: #FFFFFF;
        }

        .otp-subtitle {
          margin-top: 14px;
          margin-bottom: 0;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.48;
          color: rgba(255, 255, 255, 0.82);
        }

        .otp-form {
          margin-top: 32px;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .otp-grid {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          width: 100%;
        }

        .otp-box {
          width: 100%;
          max-width: 66px;
          height: 64px;
          border-radius: 14px;
          font-size: 24px;
        }

        .otp-btn {
          height: 50px;
          font-size: 16px;
        }

        .otp-resend {
          margin-top: 24px;
          font-size: 14px;
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

          .otp-container {
            max-width: 620px;
            padding-top: 40px;
            padding-bottom: 48px;
            padding-left: 44px;
            padding-right: 44px;
          }

          .otp-back-wrap {
            padding-bottom: 36px;
          }

          .otp-back-btn {
            width: 46px;
            height: 46px;
          }

          .otp-title {
            font-size: 36px;
          }

          .otp-subtitle {
            font-size: 16px;
            margin-top: 16px;
          }

          .otp-form {
            margin-top: 40px;
          }

          .otp-grid {
            gap: 16px;
          }

          .otp-box {
            max-width: 96px;
            height: 82px;
            border-radius: 16px;
            font-size: 30px;
          }

          .otp-btn {
            height: 56px;
            font-size: 17px;
          }

          .otp-resend {
            margin-top: 28px;
            font-size: 15px;
          }
        }
      `}</style>

      {/* พื้นหลังเต็มหน้าจอ (ไม่โดนตัดขอบบน iPad) */}
      <img src="/images/Vector.png" alt="" draggable={false} className="bg-vector-top" />
      <img src="/images/Vector (1).png" alt="" draggable={false} className="bg-vector-left" />
      <img src="/images/architectural-linework.png" alt="" draggable={false} className="bg-linework" />

      {/* Container เนื้อหาหลัก */}
      <div className="otp-container">
        <div className="otp-back-wrap">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="ย้อนกลับ"
            className="otp-back-btn"
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

        <div>
          <h1 className="otp-title">OTP Verification</h1>
          <p className="otp-subtitle">
            Enter the verification code we sent to your email
            <br />
            address or mobile number.
          </p>
        </div>

        <form onSubmit={handleVerify} noValidate className="otp-form">
          <div className="otp-grid">
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
                  className="otp-box"
                  style={{
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

          {errorMsg && (
            <p style={{ marginTop: "12px", marginBottom: 0, fontSize: "13px", fontWeight: 500, color: "#F87171" }}>
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="otp-btn"
            style={{
              marginTop: errorMsg ? "20px" : "32px",
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
            Verify
          </button>

          <div
            className="otp-resend"
            style={{
              textAlign: "center",
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
                fontSize: "inherit",
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
  );
}