'use client';

import { useState } from 'react';

export default function About() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // 포스터[1] 기반 팩트 데이터 정렬
  const coreValues = [
    { label: 'Consecutive', value: '3-Years', detail: '우수 동아리 선정 (2022-24)' },
    { label: 'Generation', value: '54th', detail: '역사와 전통의 신입 부원 모집' },
    { label: 'Convergence', value: '3-Div', detail: 'HW · SW · NS 융합 시스템' },
  ];

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] px-4 py-16 overflow-hidden flex flex-col items-center sm:px-6 lg:px-12 lg:py-24">
      
      {/* 🌌 배경: 은하계의 심연을 닮은 은은한 빛무리 */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#002060]/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#2563EB]/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl w-full space-y-20 md:space-y-32">
        
        {/* 🏢 섹션 1: 비전 선포 (사진 없이 텍스트의 힘으로) */}
        <div className="text-center space-y-8 md:space-y-10">
          <div className="mb-4 inline-block rounded-full border border-[#2563EB]/30 bg-[#2563EB]/5 px-4 py-2 text-xs font-black tracking-[0.2em] text-[#2563EB] sm:px-6 sm:text-sm sm:tracking-[0.3em] animate-bounce">
            ESTABLISHED 2022
          </div>
          
          <h2 className="text-4xl font-black text-[#002060] tracking-tighter leading-none sm:text-6xl md:text-8xl">
            WE ARE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#002060] via-[#2563EB] to-[#7B9CDE]">
              STEMINUS
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-base font-medium leading-relaxed text-gray-600 break-keep sm:text-xl md:text-2xl">
            2022년 첫 발을 내딛은 STEMINUS는 수학을 기반으로 <span className="text-[#002060] font-bold">인공지능과 과학의 경계</span>를 허뭅니다. 우리는 단순히 기술을 배우는 것을 넘어, 세상을 변화시킬 융합적 시너지를 설계합니다.
          </p>
        </div>

        {/* 📊 섹션 2: 핵심 지표 (레퍼런스 스타일을 발전시킨 부유형 레이아웃) */}
        <div className="grid grid-cols-1 gap-10 border-t border-gray-200 pt-12 md:grid-cols-3 md:gap-12 md:pt-20">
          {coreValues.map((v, i) => (
            <div key={i} className="flex flex-col items-center md:items-start space-y-2 group">
              <span className="text-xs font-black text-gray-400 tracking-widest group-hover:text-[#2563EB] transition-colors">{v.label}</span>
              <span className="text-5xl font-black text-[#002060] tracking-tighter sm:text-6xl">{v.value}</span>
              <span className="text-base font-bold text-gray-500 break-keep sm:text-lg">{v.detail}</span>
            </div>
          ))}
        </div>

        {/* 🏆 섹션 3: 성과 아카이브 (포스터의 팩트를 미학적으로 배치) */}
        <div className="space-y-10 md:space-y-16">
          <div className="flex flex-col gap-3 border-b-2 border-[#002060] pb-4 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="text-3xl font-black text-[#002060] sm:text-4xl">ARCHIVE</h3>
            <span className="text-sm font-bold italic text-gray-400 sm:text-base">2022 - 2026 PROUD MOMENTS</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { t: 'STEMCON 학술 콘테스트', d: '2025 융합 탐구 학술 콘테스트 주관 및 개최' },
              { t: '지능형 모빌리티 SW 경진대회', d: '압도적 기술력으로 대회 1위 및 2위 석권' },
              { t: '노벨 과학 동아리 선정', d: '2023년부터 2025년까지 연속 선정된 검증된 학술 동아리' },
              { t: '글로벌 R&E 프로그램', d: '대학 고교 연합 R&E 프로그램 참여 및 연구 수행' }  //아몰랑 커밋
            ].map((item, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`flex flex-col justify-between rounded-3xl p-6 transition-all duration-500 md:flex-row md:items-center md:p-8 
                  ${hoveredIdx === idx ? 'bg-[#002060] text-white scale-[1.02] shadow-2xl' : 'bg-white text-gray-800 shadow-sm'}
                `}
              >
                <h4 className="mb-2 text-xl font-bold md:mb-0 md:text-2xl">{item.t}</h4>
                <p className={`text-sm font-medium sm:text-base ${hoveredIdx === idx ? 'text-blue-200' : 'text-gray-500'}`}>
                  {item.d}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
      
      {/* 💡 하단 푸터성 텍스트 */}
      <div className="mt-20 text-4xl font-black opacity-20 whitespace-nowrap pointer-events-none select-none sm:text-6xl md:mt-32 md:text-[12rem]">
        INNOVATION BEYOND LIMITS
      </div>
    </div>
  );
}
