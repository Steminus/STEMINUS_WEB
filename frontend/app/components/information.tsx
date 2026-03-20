"use client";

import { useEffect, useState } from "react";

export default function Information() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 임시 비활성화
  }, []);

  const handleDismissToday = () => {
    localStorage.setItem("info-modal-dismissed", new Date().toDateString());
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-[#002060]/20 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out]"
        onClick={() => setOpen(false)}
      />

      {/* 모달 카드 */}
      <div className="relative z-10 w-full max-w-sm rounded-[2rem] border border-white/80 bg-white/75 p-8 text-center shadow-[0_12px_48px_rgba(0,32,96,0.14)] backdrop-blur-xl animate-[modalIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
        {/* 닫기 버튼 */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-5 right-5 w-7 h-7 flex items-center justify-center rounded-full text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-all text-sm"
          aria-label="닫기"
        >
          ✕
        </button>

        {/* 아이콘 배지 */}
        <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#002060] to-[#2563EB] shadow-[0_4px_14px_rgba(0,32,96,0.35)] animate-[iconPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)_0.1s_both]">
          <div
            className="absolute inset-0 rounded-full bg-[#2563EB]/30 animate-ping opacity-40"
            style={{ animationDuration: "2.5s" }}
          />
          <span className="relative text-2xl">📢</span>
        </div>

        {/* 제목 */}
        <h2 className="mb-1 text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#002060] via-[#2563EB] to-[#7B9CDE]">
          합격자 발표 안내
        </h2>
        <p className="text-gray-400 text-xs font-medium mb-4">
          54기 1학년 부원 모집
        </p>

        {/* 구분선 */}
        <div className="mx-auto mb-5 h-px w-12 bg-gradient-to-r from-[#002060] to-[#7B9CDE] animate-[expandLine_0.4s_ease-out_0.2s_both]" />

        {/* 날짜 박스 */}
        <div className="rounded-xl bg-gradient-to-br from-[#002060]/5 to-[#2563EB]/5 border border-[#002060]/10 px-6 py-5 mb-6 animate-[fadeUp_0.4s_ease-out_0.15s_both]">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2563EB]/50 mb-2">
            발표 일시
          </p>
          <p className="text-[#002060] font-black text-2xl tracking-tight">
            2026. 3. 18
          </p>
          <p className="text-[#2563EB] font-bold text-lg mt-1">오후 1:00</p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-2 animate-[fadeUp_0.4s_ease-out_0.25s_both]">
          <button
            onClick={() => setOpen(false)}
            className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#002060] px-8 py-3 text-base font-bold text-[#E0EBFA] shadow-[0_6px_16px_-6px_rgba(0,32,96,0.6)] transition-all duration-300 hover:shadow-[0_10px_24px_-8px_rgba(37,99,235,0.6)] hover:scale-[1.02] active:scale-95"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7B9CDE]" />
              확인
            </span>
          </button>

          <button
            onClick={handleDismissToday}
            className="w-full py-2 text-xs text-black-300 hover:text-black-500 transition-colors underline-offset-2 "
          >
            오늘 하루 보지 않기
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes iconPop {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes expandLine {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 3rem;
            opacity: 1;
          }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
