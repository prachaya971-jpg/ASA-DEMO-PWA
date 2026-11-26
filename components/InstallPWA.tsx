"use client";

import React, { useEffect, useState } from "react";
import { Download, Share, PlusSquare, X, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // 1. ตรวจสอบว่ากำลังเปิดอยู่ในโหมดแอปเต็มจอ (Standalone) แล้วหรือไม่
    const isInStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(isInStandaloneMode);

    // 2. ตรวจสอบว่าเป็นอุปกรณ์ iOS (iPhone / iPad) หรือไม่
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    // 3. ดักจับ Event ติดตั้งอัตโนมัติของ Android / Chrome / Edge
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  // ซ่อนคอมโพเนนต์ทันทีหากติดตั้งและเปิดเป็นแอปแล้ว หรือผู้ใช้กดปิดแถบแนะนำ
  if (isStandalone || dismissed) return null;

  // แสดงเฉพาะเมื่อเป็น iOS หรือเบราว์เซอร์รองรับปุ่มติดตั้งอัตโนมัติ
  if (!isIOS && !deferredPrompt) return null;

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <>
      {/* แถบปุ่มกดติดตั้งแอป */}
      <div className="bg-slate-900/90 backdrop-blur-md text-white rounded-2xl p-3.5 shadow-lg border border-white/15 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-[#0038D1] text-white p-2.5 rounded-xl shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">ติดตั้ง ASA | สถาปนิก&apos;70</h3>
            <p className="text-xs text-slate-300">
              {isIOS ? "ดูวิธีเพิ่มลงหน้าจอโฮมบน iPhone / iPad" : "เปิดใช้งานเต็มจอ ไม่ต้องโหลดผ่าน Store"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleInstallClick}
            className="bg-white hover:bg-slate-100 active:scale-95 text-slate-950 font-semibold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isIOS ? "วิธีติดตั้ง" : "ติดตั้งแอป"}</span>
          </button>

          <button
            onClick={() => setDismissed(true)}
            aria-label="ปิดแถบแนะนำ"
            className="text-slate-400 hover:text-white p-1.5 rounded-lg transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Modal แนะนำวิธีติดตั้งสำหรับ iOS (Safari) */}
      {showIOSModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white text-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base">วิธีติดตั้งบน iPhone / iPad</h3>
              <button
                onClick={() => setShowIOSModal(false)}
                className="bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ol className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-3">
                <span className="bg-[#0038D1] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  1
                </span>
                <span>
                  เปิดลิงก์นี้ผ่านเบราว์เซอร์ <b>Safari</b>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-[#0038D1] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  2
                </span>
                <span className="flex items-center gap-1.5 flex-wrap">
                  กดปุ่ม <Share className="w-4 h-4 text-sky-600 inline" /> <b>แชร์ (Share)</b> ที่แถบด้านล่าง
                </span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-[#0038D1] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  3
                </span>
                <span className="flex items-center gap-1.5 flex-wrap">
                  เลื่อนลงแล้วเลือก <PlusSquare className="w-4 h-4 text-slate-800 inline" />{" "}
                  <b>เพิ่มไปยังหน้าจอโฮม</b>
                </span>
              </li>
            </ol>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full bg-slate-900 text-white font-semibold text-sm py-3 rounded-xl hover:bg-slate-800 transition cursor-pointer"
            >
              เข้าใจแล้ว
            </button>
          </div>
        </div>
      )}
    </>
  );
}