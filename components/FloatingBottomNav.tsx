"use client";

import React from "react";
import { Home, Map, Calendar, Ticket, User } from "lucide-react";

export type NavTab = "home" | "map" | "events" | "pass" | "profile";

interface FloatingBottomNavProps {
  activeTab?: NavTab;
  isMember: boolean;
  onRequireLogin: (reason: string) => void;
  onTabSelect?: (tab: NavTab) => void;
}

const NAV_ITEMS: {
  id: NavTab;
  label: string;
  Icon: React.ElementType;
  requiresAuth?: boolean;
}[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "map", label: "Map", Icon: Map },
  { id: "events", label: "Events", Icon: Calendar },
  { id: "pass", label: "Pass", Icon: Ticket, requiresAuth: true },
  { id: "profile", label: "Profile", Icon: User, requiresAuth: true },
];

export default function FloatingBottomNav({
  activeTab = "home",
  isMember,
  onRequireLogin,
  onTabSelect,
}: FloatingBottomNavProps) {
  const handleClick = (item: (typeof NAV_ITEMS)[number]) => {
    if (item.requiresAuth && !isMember) {
      onRequireLogin("Please log in to view your event pass and profile.");
      return;
    }
    onTabSelect?.(item.id);
  };

  return (
    <nav className="home-nav-wrap">
      <div
        style={{
          backgroundColor: "rgba(24, 24, 27, 0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "9999px",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          const IconComponent = item.Icon;

          if (isActive) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleClick(item)}
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "8px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                <IconComponent size={16} /> {item.label}
              </button>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              onClick={() => handleClick(item)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.7)",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <IconComponent size={20} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}