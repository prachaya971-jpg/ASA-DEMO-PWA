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
      className={`${inter.className} ${notoSansThai.className}`}
      style={{
        minHeight: "100dvh",
        width: "100%",
        background:
          "linear-gradient(180deg, #0038D1 0%, #0E3FD4 25%, #D91414 53%, #4A0303 73%, #000000 88%, #000000 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#FFFFFF",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Container หลัก */}
      <div
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        style={{
          width: "100%",
          maxWidth: "430px",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: "36px",
          boxSizing: "border-box",
          overflow: "hidden",
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
        }}
      >
        {/* 1. Header Logo: แสดงเฉพาะหน้าที่ 1 */}
        <header
          style={{
            width: "100%",
            minHeight: "76px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "42px",
            paddingBottom: "10px",
            paddingLeft: "24px",
            paddingRight: "24px",
            boxSizing: "border-box",
            opacity: slides[currentSlide].showHeaderLogo ? 1 : 0,
            pointerEvents: slides[currentSlide].showHeaderLogo ? "auto" : "none",
            transition: "opacity 0.25s ease",
          }}
        >
          <img
            src="/images/asa-logo.png"
            alt="ASA | สถาปนิก'70"
            draggable={false}
            style={{
              height: "38px",
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
            transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
            transition: isDragging ? "none" : "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              style={{
                width: "100%",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* ส่วนภาพประกอบตรงกลาง */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  draggable={false}
                  style={{
                    width: slide.id === "event" ? "88%" : "100%",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                    userSelect: "none",
                  }}
                />

                {/* แถบ Search my event.. (หน้าที่ 2) */}
                {slide.pillType === "search" && (
                  <div
                    style={{
                      marginTop: "20px",
                      paddingLeft: "26px",
                      paddingRight: "28px",
                      height: "52px",
                      borderRadius: "20px",
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.16) 100%)",
                      border: "1.5px solid rgba(255, 255, 255, 0.35)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      color: "#FFFFFF",
                      fontSize: "15.5px",
                      fontWeight: 400,
                      letterSpacing: "0.01em",
                      boxShadow:
                        "0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <Search size={20} strokeWidth={2.2} color="#FFFFFF" />
                    <span style={{ opacity: 0.95 }}>Search my event..</span>
                  </div>
                )}

                {/* แถบ Scan & Explore (หน้าที่ 3) */}
                {slide.pillType === "scan" && (
                  <div
                    style={{
                      marginTop: "-22px",
                      paddingLeft: "12px",
                      paddingRight: "22px",
                      height: "50px",
                      borderRadius: "18px",
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.14) 100%)",
                      border: "1.5px solid rgba(255, 255, 255, 0.3)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      color: "#FFFFFF",
                      fontSize: "15px",
                      fontWeight: 500,
                      boxShadow:
                        "0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.28)",
                      zIndex: 10,
                    }}
                  >
                    {/* กล่องไอคอนสแกนไล่เฉดสีน้ำเงิน-ชมพู */}
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
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
                          width: "16px",
                          height: "16px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <span style={{ opacity: 0.95 }}>Scan &amp; Explore</span>
                  </div>
                )}
              </div>

              {/* ข้อความหัวข้อและรายละเอียดด้านล่าง */}
              <div
                style={{
                  width: "100%",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  paddingTop: "16px",
                  boxSizing: "border-box",
                }}
              >
                <h1
                  style={{
                    margin: 0,
                    fontSize: "37.8px",
                    fontWeight: 800,
                    lineHeight: 1.06,
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    whiteSpace: "pre-line",
                    color: "#FFFFFF",
                  }}
                >
                  {slide.title}
                </h1>

                {slide.description ? (
                  <p
                    style={{
                      marginTop: "12px",
                      marginBottom: 0,
                      fontSize: "14px",
                      lineHeight: "22px",
                      fontWeight: 400,
                      color: "rgba(255, 255, 255, 0.88)",
                    }}
                  >
                    {slide.description}
                  </p>
                ) : (
                  <div
                    style={{
                      marginTop: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      fontSize: "14px",
                      lineHeight: "24px",
                    }}
                  >
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
        <div
          style={{
            width: "100%",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "22px",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            boxSizing: "border-box",
          }}
        >
          {/* Pagination Dots */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              paddingTop: "2px",
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

          {/* ปุ่มด้านล่าง: หน้าที่ 1-2 แสดง Next | หน้าที่ 3 แสดง Guest และ Login */}
          <div style={{ paddingTop: "4px" }}>
            {currentSlide < slides.length - 1 ? (
              <button
                onClick={handleNext}
                style={{
                  width: "100%",
                  height: "44px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
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
                  style={{
                    flex: 1,
                    height: "44px",
                    borderRadius: "14px",
                    backgroundColor: "#242426",
                    color: "#FFFFFF",
                    fontSize: "16px",
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
                  style={{
                    flex: 1,
                    height: "44px",
                    borderRadius: "14px",
                    background: "linear-gradient(90deg, #E61919 0%, #80199C 50%, #0044FF 100%)",
                    color: "#FFFFFF",
                    fontSize: "16px",
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
    </div>
  );
}