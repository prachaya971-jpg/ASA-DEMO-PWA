"use client";

import React, { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import {
  ScanLine,
  Bell,
  QrCode,
  ChevronRight,
  MapPin,
  LogIn,
  X,
} from "lucide-react";

import { CATEGORIES, EVENTS, NEWS, SPONSORS } from "@/data/homeMock";
import FloatingBottomNav from "@/components/FloatingBottomNav";
import "./home.css";

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
  const isMember = searchParams.get("role") === "member";

  const [activeCategory, setActiveCategory] = useState("All");
  const [showQrModal, setShowQrModal] = useState(false);
  const [showLoginSheet, setShowLoginSheet] = useState(false);
  const [sheetReason, setSheetReason] = useState("");

  const filteredEvents =
    activeCategory === "All"
      ? EVENTS
      : EVENTS.filter((ev) => ev.category === activeCategory);

  const openGuestSheet = (reason: string) => {
    setSheetReason(reason);
    setShowLoginSheet(true);
  };

  const handleScanClick = () => {
    if (!isMember) {
      openGuestSheet("Please log in to scan item QR codes and reserve products at the Expo.");
      return;
    }
    alert("Opening QR Code Scanner (Member Mode)");
  };

  return (
    <div className={`${inter.className} ${notoSansThai.className} home-page`}>
      <div className="home-shell">
        {/* ================= 1. HERO SECTION ================= */}
        <div
          style={{
            background:
              "linear-gradient(180deg, #0038D1 0%, #0E3FD4 42%, #D91414 82%, #D91414 100%)",
            paddingTop: "max(16px, env(safe-area-inset-top, 16px))",
            paddingBottom: "0px",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
            }}
          >
            <img
              src="/images/asa-logo.png"
              alt="ASA | Architect'70"
              style={{ height: "35px", width: "auto", mixBlendMode: "screen" }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                type="button"
                onClick={handleScanClick}
                aria-label="Scan QR"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(255, 255, 255, 0.18)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <ScanLine size={19} />
              </button>

              <button
                type="button"
                aria-label="Notifications"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(255, 255, 255, 0.18)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <Bell size={19} />
              </button>
            </div>
          </div>

          {/* Hero Artwork */}
          <div className="hero-art-wrap">
            <img
              src="/images/hero-architect70.png"
              alt="Architect'70"
              className="hero-art-img"
            />
          </div>

          {/* UNHEARD HEIGHTS White Banner */}
          <div className="hero-banner-wrap">
            <img
              src="/images/Screenshot 2569-10-27 at 13.56.27 5.png"
              alt="Architect'70 UNHEARD HEIGHTS"
              className="hero-banner-img"
            />
          </div>

         {/* ================= 2. EVENT PASS BAR ================= */}
          <div
            style={{
              position: "relative",
              marginTop: "12px",
              padding: "10px 14px 10px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              minHeight: "58px",
              boxSizing: "border-box",
            }}
          >
            <img
              src="/images/Rectangle 95.png"
              alt=""
              draggable={false}
              className="pass-notch-bg"
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
                fontSize: "11px",
                fontWeight: 500,
                lineHeight: 1.35,
                color: "#FFFFFF",
                whiteSpace: "nowrap",
              }}
            >
              Beyond What You Imagine.
              <br />
              Explore What&rsquo;s Next.
            </div>

            {isMember ? (
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                style={{
                  position: "relative",
                  zIndex: 1,
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "5px 5px 5px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.02em",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  flexShrink: 0,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                }}
              >
                <span>MY EVENT PASS</span>
                <span
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "9999px",
                    background: "linear-gradient(135deg, #E61919 0%, #80199C 50%, #0044FF 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/images/qr_code_2.png"
                    alt="QR"
                    style={{ width: "17px", height: "17px", objectFit: "contain" }}
                  />
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => router.push("/login")}
                style={{
                  position: "relative",
                  zIndex: 1,
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "5px 5px 5px 13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.02em",
                  fontFamily: "inherit",
                  cursor: "pointer",
                  flexShrink: 0,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                }}
              >
                <span>GET MY EVENT PASS</span>
                <span
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "9999px",
                    background: "linear-gradient(135deg, #E61919 0%, #80199C 50%, #0044FF 100%)",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LogIn size={15} />
                </span>
              </button>
            )}
          </div>
          </div>

        {/* ================= 3. UPCOMING EVENT ================= */}
        <section style={{ padding: "20px 20px 0 20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>
              Upcoming Event
            </h2>
            <span
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.7)",
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              See All <ChevronRight size={14} />
            </span>
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "14px",
            }}
          >
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setActiveCategory(cat.label)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: "9999px",
                    border: active ? "none" : "1px solid rgba(255,255,255,0.16)",
                    background: active
                      ? "linear-gradient(90deg, #E6195E 0%, #80199C 50%, #0044FF 100%)"
                      : "#302E2C",
                    color: "#FFFFFF",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    fontFamily: "inherit",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {cat.icon && (
                    <img
                      src={cat.icon}
                      alt=""
                      style={{
                        width: "14px",
                        height: "14px",
                        objectFit: "contain",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Event Cards */}
          <div className="events-grid">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                style={{
                  position: "relative",
                  height: "172px",
                  borderRadius: "16px",
                  background: ev.bg,
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
              >
                {ev.image && (
                  <>
                    <img
                      src={ev.image}
                      alt={ev.title}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: 0,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.62) 100%)",
                        zIndex: 1,
                      }}
                    />
                  </>
                )}

                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "8px",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: 800,
                        lineHeight: 1.2,
                        whiteSpace: "pre-line",
                        textShadow: "0 2px 6px rgba(0,0,0,0.5)",
                      }}
                    >
                      {ev.title}
                    </h3>
                    <div
                      style={{
                        marginTop: "6px",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.9)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <MapPin size={12} /> {ev.location}
                    </div>
                  </div>

                  <span className="event-cat-pill">{ev.category}</span>
                </div>

                {/* Countdown Badges */}
                <div style={{ position: "relative", zIndex: 2, display: "flex", gap: "6px" }}>
                  {["15d", "9h", "55m"].map((t) => (
                    <span
                      key={t}
                      style={{
                        backgroundColor: "#FFFFFF",
                        color: "#000000",
                        fontSize: "11px",
                        fontWeight: 800,
                        padding: "4px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 4. NEWS ================= */}
        <section style={{ padding: "28px 20px 0 20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "14px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 700 }}>News</h2>
            <span
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.7)",
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              See all <ChevronRight size={15} />
            </span>
          </div>

          <div className="news-list">
            {NEWS.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  gap: "16px",
                  padding: 0,
                  borderRadius: "16px",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                }}
              >
                <img src={item.image} alt={item.title} className="news-img" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "14px 16px 14px 0",
                  }}
                >
                  <div className="news-title">{item.title}</div>
                  <div className="news-date">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 5. EXHIBITOR DIRECTORY ================= */}
        <section style={{ padding: "28px 20px 0 20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "14px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 700 }}>
              Exhibitor Directory
            </h2>
            <span
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.7)",
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              See all <ChevronRight size={15} />
            </span>
          </div>

          <div className="sponsors-grid">
            {SPONSORS.map((sp) => (
              <div key={sp.name} className="sponsor-item">
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: "16px",
                    backgroundColor: "#FFFFFF",
                    color: sp.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    fontWeight: 900,
                    overflow: "hidden",
                    padding: 0,
                    boxSizing: "border-box",
                  }}
                >
                  {sp.image ? (
                    <img
                      src={sp.image}
                      alt={sp.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    sp.name
                  )}
                </div>
                <span
                  style={{
                    fontSize: "12.5px",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.85)",
                    textAlign: "center",
                  }}
                >
                  {sp.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 6. EXPO ITEM RESERVATION BANNER ================= */}
        <section style={{ padding: "26px 20px 0 20px" }}>
          <div
            style={{
              position: "relative",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #FFF7ED 0%, #F3F4F6 100%)",
              color: "#111827",
              padding: "18px 14px 18px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
              overflow: "hidden",
            }}
          >
            <div style={{ zIndex: 1 }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "3px 10px",
                  borderRadius: "9999px",
                  backgroundColor: "#E6195E",
                  color: "#FFFFFF",
                  marginBottom: "8px",
                }}
              >
                New
              </span>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800 }}>
                Expo Item Reservation
              </h3>
              <p style={{ margin: "4px 0 12px 0", fontSize: "12px", color: "#4B5563" }}>
                Scan item QR codes to reserve
              </p>
              <button
                type="button"
                onClick={handleScanClick}
                style={{
                  backgroundColor: "#111827",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "8px 18px",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                Scan now
              </button>
            </div>

            <img
              src="/images/สมาร์ตโฟนโปร่งใสพร้อม QR บนแท่นอำพัน 1.png"
              alt="Scan item QR codes"
              style={{
                width: "124px",
                height: "128px",
                objectFit: "contain",
                marginBottom: "-18px",
                flexShrink: 0,
              }}
            />
          </div>
        </section>
      </div>

      {/* ================= 7. FLOATING BOTTOM NAVIGATION BAR ================= */}
      <FloatingBottomNav
        activeTab="home"
        isMember={isMember}
        onRequireLogin={openGuestSheet}
      />

      {/* ================= 8. EVENT PASS QR MODAL (Member Only) ================= */}
      {showQrModal && (
        <div
          onClick={() => setShowQrModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            zIndex: 60,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "340px",
              backgroundColor: "#FFFFFF",
              color: "#111827",
              borderRadius: "24px",
              padding: "32px 24px 28px 24px",
              textAlign: "center",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "19px", fontWeight: 800 }}>
              Your Event Pass is Ready
            </h3>
            <p style={{ margin: "6px 0 24px 0", fontSize: "14px", color: "#4B5563" }}>
              Scan your QR code at the entrance
            </p>

            <div
              style={{
                width: "190px",
                height: "190px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "8px solid #111827",
                borderRadius: "14px",
              }}
            >
              <QrCode size={156} color="#111827" strokeWidth={1.6} />
            </div>

            <div
              style={{
                marginTop: "18px",
                fontSize: "13px",
                letterSpacing: "0.08em",
                color: "#9CA3AF",
              }}
            >
              9334243343434434
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              style={{
                marginTop: "22px",
                width: "140px",
                height: "44px",
                borderRadius: "9999px",
                backgroundColor: "#27272A",
                color: "#FFFFFF",
                border: "none",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ================= 9. LOGIN BOTTOM SHEET (Guest Only) ================= */}
      {showLoginSheet && (
        <div
          onClick={() => setShowLoginSheet(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.68)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            zIndex: 60,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "430px",
              backgroundColor: "#18181B",
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
              borderTop: "1px solid rgba(255,255,255,0.12)",
              padding: "20px 24px max(32px, env(safe-area-inset-bottom, 32px)) 24px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>
                Login Required
              </h3>
              <button
                type="button"
                onClick={() => setShowLoginSheet(false)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "none",
                  borderRadius: "9999px",
                  width: "32px",
                  height: "32px",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ margin: "10px 0 22px 0", fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
              {sheetReason}
            </p>

            <button
              type="button"
              onClick={() => router.push("/login")}
              style={{
                width: "100%",
                height: "48px",
                borderRadius: "14px",
                background: "linear-gradient(90deg, #E61919 0%, #80199C 50%, #0044FF 100%)",
                color: "#FFFFFF",
                border: "none",
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: "inherit",
                cursor: "pointer",
              }}
            >
              Login / Verify
            </button>
          </div>
        </div>
      )}
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