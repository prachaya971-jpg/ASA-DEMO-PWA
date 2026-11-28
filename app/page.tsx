"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import { Search } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function WelcomePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number | null>(null);

  const slides = [
    {
      id: "welcome",
      showHeaderLogo: true,
      pillType: "none" as const,
      title: "ARCHITECT'70\nUNHEARD\nHEIGHTS",
      date: "27 APR – 02 MAY 2027",
      location: "IMPACT Challenger Hall 1–3",
      description: "",
      image: "/images/hero-architect70.png",
    },
    {
      id: "explore",
      showHeaderLogo: false,
      pillType: "search" as const,
      title: "FIND EVENTS.\nNEVER MISS ONE.",
      date: "",
      location: "",
      description:
        "Explore upcoming events, talks and exhibitions, and get reminders so you never miss out.",
      image: "/images/intro-explore.png",
    },
    {
      id: "event",
      showHeaderLogo: false,
      pillType: "scan" as const,
      title: "YOUR EVENT,\nMADE EASY.",
      date: "",
      location: "",
      description:
        "Access your event pass, show your QR code for entry, scan QR codes on selected products, and reserve the items you love.",
      image: "/images/image 308.png",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handleStart = (clientX: number) => {
    startXRef.current = clientX;
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || startXRef.current === null) return;
    const diff = clientX - startXRef.current;
    setDragOffset(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    const threshold = 50;

    if (dragOffset < -threshold && currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else if (dragOffset > threshold && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }

    setDragOffset(0);
    setIsDragging(false);
    startXRef.current = null;
  };

  return (
    <div
      className={`${inter.className} ${notoSansThai.className} asa-wrapper`}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        backgroundImage:
          "linear-gradient(180deg, #0038D1 0%, #0E3FD4 25%, #D91414 53%, #4A0303 73%, #000000 86%, #000000 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFFFFF",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* CSS Responsive สำหรับ Mobile และ iPad */}
      <style>{`
        .asa-container {
          width: 100%;
          max-width: 430px;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-top: env(safe-area-inset-top, 12px);
          padding-bottom: max(24px, env(safe-area-inset-bottom, 24px));
          box-sizing: border-box;
          overflow: hidden;
          user-select: none;
        }

        .asa-slide {
          width: 100%;
          height: 100%;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .asa-media-box {
          width: 100%;
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          box-sizing: border-box;
        }

        .asa-slide-img {
          height: auto;
          object-fit: contain;
          display: block;
          user-select: none;
        }

        .asa-text-box {
          width: 100%;
          padding: 10px 24px 0 24px;
          box-sizing: border-box;
          flex-shrink: 0;
        }

        .asa-title {
          margin: 0;
          font-size: clamp(30px, 8.8vw, 36px);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          white-space: pre-line;
          color: #FFFFFF;
        }

        .asa-desc {
          margin-top: 10px;
          margin-bottom: 0;
          font-size: 13.5px;
          line-height: 20px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.88);
        }

        .asa-meta {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 14px;
          line-height: 21px;
        }

        .asa-controls {
          width: 100%;
          padding: 16px 24px 0 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-sizing: border-box;
          flex-shrink: 0;
        }

        .asa-btn-group {
          width: 100%;
        }

        .asa-btn {
          height: 44px;
          font-size: 16px;
        }

        /* ================= iPad / Tablet (>= 768px) ================= */
        @media (min-width: 768px) {
          .asa-container {
            max-width: 680px;
            padding-top: 28px;
            padding-bottom: 36px;
          }

          .asa-text-box {
            padding: 16px 40px 0 40px;
          }

          .asa-title {
            font-size: 44px;
          }

          .asa-desc {
            font-size: 16px;
            line-height: 25px;
            margin-top: 14px;
          }

          .asa-meta {
            font-size: 16px;
            line-height: 25px;
            margin-top: 14px;
          }

          .asa-controls {
            padding: 24px 40px 0 40px;
            gap: 20px;
          }

          .asa-btn {
            height: 52px;
            font-size: 17px;
          }
        }
      `}</style>

      {/* Container หลัก */}
      <div
        className="asa-container"
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {/* 1. Header Logo */}
        <header
          style={{
            width: "100%",
            height: slides[currentSlide].showHeaderLogo ? "56px" : "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: slides[currentSlide].showHeaderLogo ? "14px" : "0px",
            paddingBottom: "4px",
            paddingLeft: "24px",
            paddingRight: "24px",
            boxSizing: "border-box",
            opacity: slides[currentSlide].showHeaderLogo ? 1 : 0,
            pointerEvents: slides[currentSlide].showHeaderLogo ? "auto" : "none",
            transition: "all 0.25s ease",
            flexShrink: 0,
          }}
        >
          <img
            src="/images/asa-logo.png"
            alt="ASA | สถาปนิก'70"
            draggable={false}
            style={{
              height: "34px",
              width: "auto",
              objectFit: "contain",
              mixBlendMode: "screen",
              userSelect: "none",
            }}
          />
        </header>

        {/* 2. พื้นที่สไลด์ */}
        <div
          style={{
            display: "flex",
            width: "100%",
            flex: 1,
            minHeight: 0,
            transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
            transition: isDragging ? "none" : "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="asa-slide">
              {/* ส่วนภาพประกอบ */}
              <div
                className="asa-media-box"
                style={{
                  paddingLeft: slide.id === "welcome" ? "0px" : "16px",
                  paddingRight: slide.id === "welcome" ? "0px" : "16px",
                }}
              >
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  draggable={false}
                  className="asa-slide-img"
                  style={{
                    width: slide.id === "welcome" ? "100%" : "auto",
                    maxWidth: slide.id === "event" ? "84%" : "100%",
                    maxHeight: slide.pillType !== "none" ? "36dvh" : "43dvh",
                  }}
                />

                {/* แถบ Search my event.. (หน้าที่ 2) */}
                {slide.pillType === "search" && (
                  <div
                    style={{
                      marginTop: "14px",
                      paddingLeft: "24px",
                      paddingRight: "26px",
                      height: "46px",
                      borderRadius: "18px",
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.16) 100%)",
                      border: "1.5px solid rgba(255, 255, 255, 0.35)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      color: "#FFFFFF",
                      fontSize: "14.5px",
                      fontWeight: 400,
                      letterSpacing: "0.01em",
                      boxShadow:
                        "0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
                      flexShrink: 0,
                    }}
                  >
                    <Search size={18} strokeWidth={2.2} color="#FFFFFF" />
                    <span style={{ opacity: 0.95 }}>Search my event..</span>
                  </div>
                )}

                {/* แถบ Scan & Explore (หน้าที่ 3) */}
                {slide.pillType === "scan" && (
                  <div
                    style={{
                      marginTop: "-18px",
                      paddingLeft: "10px",
                      paddingRight: "20px",
                      height: "46px",
                      borderRadius: "16px",
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.14) 100%)",
                      border: "1.5px solid rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      color: "#FFFFFF",
                      fontSize: "14.5px",
                      fontWeight: 500,
                      boxShadow:
                        "0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.28)",
                      zIndex: 10,
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "linear-gradient(135deg, #2563EB 0%, #D91464 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src="/images/Scan.png"
                        alt="Scan"
                        draggable={false}
                        style={{
                          width: "15px",
                          height: "15px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <span style={{ opacity: 0.95 }}>Scan &amp; Explore</span>
                  </div>
                )}
              </div>

              {/* ข้อความหัวข้อและรายละเอียด */}
              <div className="asa-text-box">
                <h1 className="asa-title">{slide.title}</h1>

                {slide.description ? (
                  <p className="asa-desc">{slide.description}</p>
                ) : (
                  <div className="asa-meta">
                    <p style={{ margin: 0, fontWeight: 500, color: "rgba(255, 255, 255, 0.95)" }}>
                      {slide.date}
                    </p>
                    <p style={{ margin: 0, fontWeight: 400, color: "rgba(255, 255, 255, 0.85)" }}>
                      {slide.location}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 3. ส่วนควบคุมด้านล่าง: Pagination Dots + ปุ่ม */}
        <div className="asa-controls">
          {/* Pagination Dots */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`ไปยังหน้าที่ ${index + 1}`}
                style={{
                  height: "5px",
                  width: currentSlide === index ? "24px" : "16px",
                  borderRadius: "9999px",
                  backgroundColor: currentSlide === index ? "#E6195E" : "#FFFFFF",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* ปุ่มด้านล่าง */}
          <div className="asa-btn-group">
            {currentSlide < slides.length - 1 ? (
              <button
                onClick={handleNext}
                className="asa-btn"
                style={{
                  width: "100%",
                  paddingLeft: "24px",
                  paddingRight: "24px",
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
                Next
              </button>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                }}
              >
                {/* ปุ่ม Guest */}
                <button
                  onClick={() => router.push("/home")}
                  className="asa-btn"
                  style={{
                    flex: 1,
                    borderRadius: "14px",
                    backgroundColor: "#242426",
                    color: "#FFFFFF",
                    fontWeight: 600,
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    cursor: "pointer",
                    transition: "transform 0.15s ease, background-color 0.15s ease",
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Guest
                </button>

                {/* ปุ่ม Login */}
                <button
                  onClick={() => router.push("/login")}
                  className="asa-btn"
                  style={{
                    flex: 1,
                    borderRadius: "14px",
                    background: "linear-gradient(90deg, #E61919 0%, #80199C 50%, #0044FF 100%)",
                    color: "#FFFFFF",
                    fontWeight: 600,
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
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* แถบสีดำปิดขอบล่าง Safe Area */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: "max(1px, env(safe-area-inset-bottom))",
          backgroundColor: "#000000",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}