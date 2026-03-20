"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline"; // 가상의 아이콘

// 포스터에서 추출한 분야별 상세 활동 데이터
const divisionData = {
  SW: {
    title: "소프트웨어 (SW)",
    posterDesc:
      "프로그래밍 언어와 알고리즘 설계, 데이터 분석 등에 관심 있는 학생",
    bullets: [
      "Rust/Python 언어 학습",
      "알고리즘 설계 및 구현",
      "데이터 분석 및 AI 연구",
      "웹/앱 개발 프로젝트",
    ],
    themeColor: "#002060", // 짙은 남색 (궤도의 중심 에너지)
    iconColor: "#2563EB",
  },
  HW: {
    title: "하드웨어 (HW)",
    posterDesc:
      "전기·전자 및 기계공학 등 하드웨어 설계와 제어 분야에 관심 있는 학생",
    bullets: [
      "전기·전자 회로 설계",
      "기계공학 및 메카트로닉스",
      "시스템 설계 및 제어",
      "시제품 제작 및 테스팅",
    ],
    themeColor: "#002060", // 짙은 남색 (궤도의 중심 에너지)
    iconColor: "#002060",
  },
  NS: {
    title: "자연과학 (NS)",
    posterDesc:
      "화학공학, 생명공학 등 물질의 반응과 생명 현상을 이해하는 데 관심 있는 학생",
    bullets: [
      "물질 반응 연구 및 실험",
      "생명 현상 이해 및 분석",
      "융합 과학 주제 탐구",
      "학술 논문 및 보고서",
    ],
    themeColor: "#002060", // 짙은 남색 (궤도의 중심 에너지)
    iconColor: "#7B9CDE",
  },
};

const divisions = ["SW", "HW", "NS"] as const;
type DivisionType = (typeof divisions)[number];

export default function Activity() {
  const [hoveredDivision, setHoveredDivision] = useState<DivisionType | null>(
    null,
  );

  return (
    // 🎨 Header 높이 제외한 전체 화면을 무한한 은하계 공간으로 설정
    <div className="relative min-h-[calc(100vh-76px)] bg-[#F8FAFC] font-sans text-gray-900 overflow-hidden flex flex-col items-center py-16 px-4 lg:px-12">
      {/* 🎨 배경 은하계 그라데이션 및 빛무리 (회전 안 함) */}
      <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] bg-[#002060]/5 rounded-full filter blur-[130px] z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[60vw] h-[60vw] bg-[#2563EB]/5 rounded-full filter blur-[150px] z-0 pointer-events-none"></div>

      {/* 캔버스 래퍼 - 거대한 중앙 유리 패널 철거, 공간 활용성 극대화 */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center h-full">
        {/* 페이지 타이틀 (모집 분야) */}
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002060] to-[#7B9CDE]">
            모집 분야
          </span>
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 font-semibold mb-12 lg:mb-24 text-center max-w-2xl leading-relaxed break-keep">
          2026년, <span className="text-[#002060] font-bold">HW</span>,{" "}
          <span className="text-[#2563EB] font-bold">SW</span>,{" "}
          <span className="text-[#7B9CDE] font-bold">NS</span> 은하계의 고정된
          궤도가 만나는 곳.
          <br />
          열정적인 54기 신입생의 에너지를 기다립니다.
        </p>

        {/* 📱 모바일 뷰: 기존처럼 세로 스택형 */}
        <div className="w-full flex flex-col gap-8 lg:hidden pb-12">
          {divisions.map((div) => (
            <MobileCard key={div} div={div} data={divisionData[div]} />
          ))}
        </div>

        {/* =======================================================
            💻 데스크톱 뷰: 팽창하는 전설의 '고정형 궤도'
        ======================================================= */}
        <div className="hidden lg:block relative w-full h-[750px] mx-auto group">
          {/* 🌀 완벽한 궤도 선 (점선 원) - 배경에 고정 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-dashed border-[#002060]/10 z-0"></div>

          {/* 중앙 코어 (STEMINUS 엔진) - 배경에 고정 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-[#002060]/20 to-[#7B9CDE]/20 blur-xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#002060] font-black text-2xl tracking-[0.3em] opacity-30">
            STEMINUS
          </div>

          {/* 은하계 디테일: 배경의 미세한 행성 포인트들 */}
          <div className="absolute top-[20%] right-[15%] w-3 h-3 rounded-full bg-[#7B9CDE]/10 blur-sm z-0"></div>
          <div className="absolute bottom-[30%] left-[10%] w-2 h-2 rounded-full bg-[#7B9CDE]/20 z-0"></div>

          {divisions.map((div) => {
            const data = divisionData[div];
            const isHovered = hoveredDivision === div;
            const otherHovered = hoveredDivision !== null && !isHovered;

            // 🎨 [핵심] 고정된 궤도 위에 박힌 듯한 위치 설정
            let positionClasses = "";
            if (div === "SW") {
              positionClasses = "top-0 left-1/2 -translate-x-1/2 z-30"; // 상단 중앙
            } else if (div === "HW") {
              positionClasses = "bottom-[10%] left-0 z-20"; // 좌측 하단
            } else if (div === "NS") {
              positionClasses = "bottom-[10%] right-0 z-20"; // 우측 하단
            }

            return (
              <div
                key={div}
                className={`absolute w-[360px] flex flex-col items-center text-center backdrop-blur-2xl bg-white/70 border border-white/80 p-10 rounded-[2.5rem] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-[0_8px_32px_rgba(0,32,96,0.06)]
                  ${positionClasses}
                  ${otherHovered ? "opacity-40 blur-[2px]" : "opacity-100"}
                  ${isHovered ? "scale-110 shadow-2xl !z-50" : "scale-100"}
                `}
                onMouseEnter={() => setHoveredDivision(div)}
                onMouseLeave={() => setHoveredDivision(null)}
              >
                {/* 분야별 배지 아이콘 (Sharengan Icon 통합) */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-lg mb-6 transform transition-transform duration-500"
                  style={{ backgroundColor: data.iconColor }}
                >
                  {div}
                </div>

                {/* 타이틀 */}
                <h3
                  className="text-2xl font-bold mb-4 tracking-tight"
                  style={{ color: data.themeColor }}
                >
                  {data.title}
                </h3>

                {/* 설명 */}
                <p className="text-gray-700 font-medium leading-relaxed mb-4 break-keep px-2">
                  {data.posterDesc}
                </p>

                {/* 마우스 호버 시 스르륵 열리는 상세 활동 박스 (image_2.png에 맞춰 재정렬) */}
                <div
                  className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${isHovered ? "max-h-[300px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}`}
                >
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {data.bullets.map((bullet, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-center bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm text-[0.85rem] font-bold text-gray-800 break-keep hover:bg-white transition-colors"
                      >
                        {bullet}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 모바일용 컴포넌트
function MobileCard({ div, data }: any) {
  return (
    <div className="w-full flex flex-col items-center text-center backdrop-blur-2xl bg-white/60 border border-white/80 p-8 rounded-[2rem] shadow-sm">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white mb-6"
        style={{ backgroundColor: data.iconColor }}
      >
        {div}
      </div>
      <h3
        className="text-2xl font-bold mb-4"
        style={{ color: data.themeColor }}
      >
        {data.title}
      </h3>
      <p className="text-gray-700 font-medium leading-relaxed mb-6 break-keep">
        {data.posterDesc}
      </p>
      <div className="grid grid-cols-2 gap-3 w-full mt-auto">
        {data.bullets.map((bullet: string, idx: number) => (
          <div
            key={idx}
            className="flex items-center justify-center bg-white/80 rounded-xl px-4 py-3 shadow-sm text-[0.85rem] font-bold text-gray-800 break-keep"
          >
            {bullet}
          </div>
        ))}
      </div>
    </div>
  );
}
