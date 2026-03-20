"use client";

import { useState } from "react";

export default function Apply() {
  const [closed, setClosed] = useState(false);

  const schedule = [
    {
      step: "01",
      title: "서류 접수",
      date: "03.09(월) — 03.17(화) 23:59",
      desc: "구글 폼을 통한 온라인 접수",
      done: true,
    },
    {
      step: "02",
      title: "서류 합격 발표",
      date: "03.18(수)",
      desc: "개별 연락처를 통해 공지",
      done: false,
    },
    {
      step: "03",
      title: "2차 면접",
      date: "03.19(목) — 03.23(월)",
      desc: "심층 대면 면접 진행",
      done: false,
    },
    {
      step: "04",
      title: "최종 합격 발표",
      date: "03.23(월)",
      desc: "STEMINUS 54기 합류",
      done: false,
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] px-4 py-16 overflow-hidden flex flex-col items-center sm:px-6 lg:py-24">
      {/* 배경 레이어 */}
      <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[#2563EB]/6 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[40vw] h-[40vw] bg-[#002060]/8 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full space-y-14 md:space-y-20">
        {/* 타이틀 */}
        <div className="text-center space-y-3 animate-[fadeUp_0.5s_ease-out_both]">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#2563EB]/60">
            STEMINUS(KE) · 54기
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#002060] tracking-tighter">
            JOIN{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7B9CDE]">
              STEMINUS
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-semibold tracking-[0.15em] uppercase">
            신입 부원 모집 프로세스
          </p>
        </div>

        {/* 일정 카드 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {schedule.map((item, idx) => (
            <div
              key={idx}
              style={{ animationDelay: `${0.1 + idx * 0.07}s` }}
              className="group relative rounded-[1.5rem] border border-white bg-white/60 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,32,96,0.1)] sm:p-8 animate-[fadeUp_0.5s_ease-out_both]"
            >
              {/* 완료된 단계 상단 강조선 */}
              {item.done && (
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#2563EB]/30 to-transparent rounded-full" />
              )}

              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl sm:text-4xl font-black text-[#2563EB]/15 group-hover:text-[#2563EB]/35 transition-colors duration-300">
                  {item.step}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold sm:px-4 sm:text-xs ${item.done ? "bg-[#002060]/8 text-[#002060]/50" : "bg-[#002060] text-white"}`}
                >
                  {item.done ? "완료" : "예정"}
                </span>
              </div>

              <h3
                className={`mb-2 text-lg font-black sm:text-xl transition-colors duration-300 ${item.done ? "text-gray-400" : "text-[#002060] group-hover:text-[#2563EB]"}`}
              >
                {item.title}
              </h3>
              <p
                className={`font-extrabold mb-1 text-sm sm:text-base ${item.done ? "text-gray-300" : "text-[#2563EB]"}`}
              >
                {item.date}
              </p>
              <p className="text-gray-400 text-sm font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA 섹션 */}
        <div className="animate-[fadeUp_0.5s_ease-out_0.35s_both]">
          <div className="rounded-[2rem] border border-white/80 bg-white/50 px-8 py-10 text-center shadow-[0_4px_24px_rgba(0,32,96,0.06)] backdrop-blur-xl flex flex-col items-center gap-7">
            <div className="space-y-1">
              <p className="text-gray-400 text-sm font-semibold italic">
                Ready to accelerate your potential?
              </p>
              <p className="text-[#002060] font-black text-xl sm:text-2xl">
                54기 지원서를 작성하세요.
              </p>
            </div>

            <button
              onClick={() => setClosed(true)}
              className="relative group w-full max-w-xs overflow-hidden rounded-full border-2 border-[#002060]/10 bg-white px-8 py-4 text-center text-base font-black tracking-tight shadow-[0_12px_32px_rgba(0,32,96,0.08)] transition-all duration-300 hover:border-[#2563EB] hover:scale-105 hover:shadow-[0_16px_40px_rgba(37,99,235,0.15)] active:scale-95 sm:max-w-none sm:px-14 sm:py-5 sm:text-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#002060] to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <span className="relative z-10 flex items-center justify-center gap-3 text-[#002060] group-hover:text-white transition-colors duration-400">
                지원서 작성하러 가기
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1.5 transition-transform duration-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>

            {/* 상태 정보 */}
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6 text-sm text-gray-400 font-medium">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                <span>현재 접수 마감</span>
              </div>
              <span className="hidden sm:block text-gray-200">|</span>
              <span>문의: 회장 오범근 · 부회장 한지완</span>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 장식 */}
      <div className="mt-16 md:mt-28 opacity-[0.04] font-black text-4xl sm:text-6xl md:text-9xl whitespace-nowrap select-none pointer-events-none tracking-tighter">
        FUTURE IS NOW STEMINUS
      </div>

      {/* 마감 모달 */}
      {closed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-[#002060]/20 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out]"
            onClick={() => setClosed(false)}
          />
          <div className="relative z-10 w-full max-w-sm rounded-[2rem] border border-white/80 bg-white/75 p-8 text-center shadow-[0_12px_48px_rgba(0,32,96,0.14)] backdrop-blur-xl animate-[modalIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#002060] to-[#2563EB] shadow-[0_4px_14px_rgba(0,32,96,0.35)] animate-[iconPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)_0.1s_both]">
              <span className="text-2xl">🔒</span>
            </div>
            <h2 className="mb-2 text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#002060] via-[#2563EB] to-[#7B9CDE]">
              지원 마감
            </h2>
            <div className="mx-auto mb-5 h-px w-12 bg-gradient-to-r from-[#002060] to-[#7B9CDE] animate-[expandLine_0.4s_ease-out_0.2s_both]" />
            <p className="text-gray-500 text-sm leading-relaxed mb-1 animate-[fadeUp_0.4s_ease-out_0.15s_both]">
              서류 접수 기간이 종료되었습니다.
            </p>
            <div className="h-5"></div>
            <div className="animate-[fadeUp_0.4s_ease-out_0.25s_both]">
              <button
                onClick={() => setClosed(false)}
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#002060] px-8 py-3 text-base font-bold text-[#E0EBFA] shadow-[0_6px_16px_-6px_rgba(0,32,96,0.6)] transition-all duration-300 hover:shadow-[0_10px_24px_-8px_rgba(37,99,235,0.6)] hover:scale-[1.02] active:scale-95"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7B9CDE]" />
                  확인
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
