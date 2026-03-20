"use client";

import Link from "next/link";
import Information from "./components/information";
import ResultCheck from "./components/result-check";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100svh-73px)] bg-[#F8FAFC] font-sans text-gray-900 overflow-hidden flex flex-col items-center justify-center px-4 py-6 sm:py-8">
      {/* 🎨 배경 색채 레이어 */}
      <div className="absolute top-[-5%] left-[-5%] w-[45vw] h-[45vw] bg-[#002060]/15 rounded-full mix-blend-multiply filter blur-[100px] z-0"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[#2563EB]/10 rounded-full mix-blend-multiply filter blur-[120px] z-0"></div>
      <div className="absolute top-[30%] left-[20%] w-[35vw] h-[35vw] bg-[#7B9CDE]/20 rounded-full mix-blend-multiply filter blur-[90px] z-0"></div>

      {/* 메인 캔버스 영역 */}
      {/* 🎨 [수정] max-w-4xl(기존) -> max-w-5xl(현재)로 아주 살짝만 확장 */}
      <main className="relative z-10 flex w-full max-w-5xl justify-center sm:px-6 lg:px-8">
        {/* 🎨 [수정] 패딩을 p-12 md:p-20에서 p-14 md:p-24로 부드럽게 키움 */}
        <div className="relative flex w-full flex-col items-center rounded-[2rem] border border-white/80 bg-white/60 p-8 text-center shadow-[0_8px_40px_rgba(0,32,96,0.06)] backdrop-blur-xl transition-all duration-500 sm:p-10 md:rounded-[3rem] md:p-16 lg:p-24">
          {/* 1. 메인 타이틀 (적당한 웅장함) */}
          {/* 🎨 [수정] 글씨 크기를 6xl~7xl 선으로 맞추어 부담스럽지 않게 세팅 */}
          <h1 className="relative z-10 mb-8 text-3xl font-extrabold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:mb-10 lg:text-[4.5rem]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002060] via-[#2563EB] to-[#7B9CDE]">
              STEMINUS(KE)
            </span>
            <br className="md:hidden" />
            <span className="text-gray-900 mt-2 md:mt-0 md:ml-5 inline-block">
              54기 1학년 모집
            </span>
          </h1>

          {/* 2. 서브 텍스트 */}
          <div className="relative z-10 mb-10 flex w-full justify-center lg:mb-14">
            <p className="max-w-3xl text-center text-base font-medium leading-relaxed text-gray-700 sm:text-lg md:text-2xl lg:text-[1.65rem]">
              대신고 최대 규모 융합 동아리{" "}
              <span className="font-bold text-[#002060]">STEMINUS</span>와 함께
              <br className="hidden md:block" />
              활동하고자 하는 열정적인 부원을 모집합니다!
            </p>
          </div>

          {/* 3. CTA 버튼 */}
          <div className="flex justify-center w-full z-10">
            <Link
              href="/apply"
              className="group relative inline-flex w-full max-w-xs items-center justify-center overflow-hidden rounded-full bg-[#002060] px-8 py-4 text-base font-bold shadow-[0_10px_20px_-10px_rgba(0,32,96,0.6)] transition-all duration-300 hover:shadow-[0_15px_30px_-10px_rgba(37,99,235,0.6)] sm:w-auto sm:max-w-none sm:px-14 sm:py-5 sm:text-xl"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="relative flex items-center gap-3 text-[#E0EBFA]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7B9CDE]"></span>
                지원서 작성하기
              </span>
            </Link>
          </div>
        </div>
      </main>

      <Information />
      <ResultCheck />

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
