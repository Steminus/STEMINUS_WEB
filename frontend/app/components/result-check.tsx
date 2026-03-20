"use client";

import { useEffect, useState, useCallback, useRef } from "react";

// ============================================================
// LAYER 1: Anti-tampering — freeze prototypes & detect devtools
// ============================================================
const _$ = (() => {
  const _t = Date.now();
  let _d = false;
  const _c = () => {
    const _s = performance.now();
    // debugger triggers a pause; if >100ms elapsed, devtools is open
    // eslint-disable-next-line no-debugger
    debugger;
    if (performance.now() - _s > 100) _d = true;
  };
  if (typeof window !== "undefined") {
    try {
      Object.freeze(Object.prototype);
      Object.freeze(Array.prototype);
    } catch {}
    // periodic devtools check (runs every 2s)
    const _iv = setInterval(_c, 2000);
    // self-destruct after 30min to avoid memory leaks
    setTimeout(() => clearInterval(_iv), 1800000);
  }
  return {
    isCompromised: () => _d,
    boot: _t,
  };
})();

// ============================================================
// LAYER 2: Multi-stage key derivation (PBKDF-lite via iterative XOR+rotate)
// ============================================================
const _dk = (seed: number[]): number[] => {
  const r = [...seed];
  for (let round = 0; round < 7; round++) {
    for (let i = 0; i < r.length; i++) {
      r[i] = ((r[i] ^ (r[(i + 3) % r.length] + round)) >>> 0) & 0xff;
      r[i] = ((r[i] << 3) | (r[i] >>> 5)) & 0xff; // rotate left 3
    }
  }
  return r;
};

// Base seed — looks like noise, derives actual key at runtime
const _S0 = [
  0x7e, 0x11, 0x44, 0xa2, 0x3f, 0xc8, 0x09, 0xd6, 0x5b, 0x23, 0x91, 0x6c, 0xf0,
  0x38, 0xb5, 0x4d,
];
let _KD: number[] | null = null;
const _gk = (): number[] => {
  if (!_KD) _KD = _dk(_S0);
  return _KD;
};

// ============================================================
// LAYER 3: Decode with derived key + per-entry salt
// ============================================================
const _xd2 = (encoded: string, salt: number): string => {
  const k = _gk();
  const b = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
  const out = new Uint8Array(b.length);
  for (let i = 0; i < b.length; i++) {
    const ki = k[(i + salt) % k.length];
    out[i] = b[i] ^ ki ^ ((salt * 7 + i * 13) & 0xff);
  }
  return new TextDecoder().decode(out);
};

// ============================================================
// LAYER 4: Encrypted data blob — each entry has unique salt index
// Format: [encoded_classnumber, encoded_name, salt]
// ============================================================
const _E: [string, string, number][] = [
  ["jfodotI=", "V0+Tf0c+sXXV", 17],
  ["HYqIMmE=", "xwou7/OSQOFV", 33],
  ["KIUAz7g=", "9SmZFgZomPir", 55],
  ["zm8jWNU=", "E8Kghnw93Ws9", 83],
  ["SXbhUPU=", "k/ZAjV2pUCS+", 117],
  ["x/2qQI0=", "HU87nCJ6zzNc", 157],
  ["gJkrEgQ=", "XRuGzZNd+xTb", 203],
  ["PjTvXKQ=", "45lsgh2O4Mlp", 255],
  ["HPmnt0w=", "wVQhaP3Zx2yN", 313],
  ["3DltdA4=", "BoztqZmBhzTc", 377],
  ["/nSgHOQ=", "I9kswnTLIQqB", 191],
  ["QFni0UE=", "m9BaCt0JvFaj", 267],
  ["Bz1rgEc=", "3LvfXewDj084", 349],
  ["iTamE7Q=", "VJo0ygr4kOVn", 437],
  ["Dq/jmRQ=", "0gpIRrp4nSt9", 275],
  ["6ETJDXs=", "M8BV1sY12Lvi", 375],
  ["3UrMcSE=", "AOZfr5vyASOd", 225],
  ["zTrTYxc=", "FrNruI/C8TeR", 337],
  ["2HUd/aE=", "AvW8JhYF78Gr", 455],
  ["Xt+Vyqk=", "hVYkFwmpasq9", 323],
  ["GUbSgww=", "xNZhXZJxYBby", 453],
  ["l432c7U=", "Sh1WrRyqOcp8", 333],
  ["8AmcgfE=", "K4AqWkilbLJf", 475],
  ["ziTZT7Q=", "E59ElQje8fpt", 367],
  ["rClRZ/4=", "cYHBuFaJlxzd", 521],
  ["DMm0x1o=", "0WQxHuHx9mNE", 425],
  ["7gS8L9M=", "NIQd8lfL", 591],
  ["0Ol/o94=", "DUfvfWOtDNJ/", 507],
  ["N20V0RU=", "7OSjDLgWX4HY", 429],
  ["ueZ84mU=", "ZHf1PcLhwYkW", 613],
];

// ============================================================
// LAYER 5: Lazy decode with integrity check (SHA-256 of decoded list)
// ============================================================
let _cache: { c: string; n: string }[] | null = null;
const _INTEGRITY =
  "b3859e8c1613def347cc2b09015bcdf72b1fdd3deb480184384b5582423863fa";

const _computeHash = async (data: string): Promise<string> => {
  const buf = new TextEncoder().encode(data);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

const _decode = async (): Promise<{ c: string; n: string }[]> => {
  if (_cache) return _cache;

  // Anti-tamper: refuse if devtools detected
  if (_$.isCompromised()) return [];

  const list = _E.map(([ec, en, s]) => ({
    c: _xd2(ec, s),
    n: _xd2(en, s),
  }));

  // Integrity verification
  const serialized = list.map((x) => x.c + x.n).join("|");
  const hash = await _computeHash(serialized);
  if (hash !== _INTEGRITY) {
    // Data tampered — return empty
    return [];
  }

  _cache = list;
  return list;
};

// ============================================================
// LAYER 6: Constant-time comparison (prevent timing attacks)
// ============================================================
const _ceq = (a: string, b: string): boolean => {
  const la = new TextEncoder().encode(a);
  const lb = new TextEncoder().encode(b);
  if (la.length !== lb.length) {
    // Still iterate to prevent length-based timing leak
    let r = la.length ^ lb.length;
    const max = Math.max(la.length, lb.length);
    for (let i = 0; i < max; i++)
      r |= (la[i % la.length] || 0) ^ (lb[i % lb.length] || 0);
    return false;
  }
  let r = 0;
  for (let i = 0; i < la.length; i++) r |= la[i] ^ lb[i];
  return r === 0;
};

// ============================================================
// LAYER 7: Rate limiting — max 5 attempts per 30s, lockout after 15 fails
// ============================================================
const _RL = {
  attempts: [] as number[],
  total: 0,
  locked: false,
  lockUntil: 0,
  check(): boolean {
    if (this.locked && Date.now() < this.lockUntil) return false;
    if (this.locked && Date.now() >= this.lockUntil) {
      this.locked = false;
      this.total = 0;
      this.attempts = [];
    }
    const now = Date.now();
    this.attempts = this.attempts.filter((t) => now - t < 30000);
    if (this.attempts.length >= 5) return false;
    return true;
  },
  record(): void {
    this.attempts.push(Date.now());
    this.total++;
    if (this.total >= 15) {
      this.locked = true;
      this.lockUntil = Date.now() + 300000; // 5min lockout
    }
  },
  getRemainingLock(): number {
    if (!this.locked) return 0;
    return Math.max(0, Math.ceil((this.lockUntil - Date.now()) / 1000));
  },
};

// ============================================================
// LAYER 8: Link reconstruction — triple-split + shuffle indices
// ============================================================
const _LP = [
  "L28v", // idx0: /o/
  "b3Blbg==", // idx1: open
  "Z25mOWpXbGk=", // idx2: gnf9jWli
  "a2FrYW8=", // idx3: kakao
  "Y29t", // idx4: com
];
const _LO = [1, 3, 4, 0, 2]; // assembly order
const _buildLink = (): string => {
  const p = _LO.map((i) => atob(_LP[i]));
  return `https://${p[0]}.${p[1]}.${p[2]}${p[3]}${p[4]}`;
};

type Step = "form" | "pass" | "fail" | "locked";

// ============================================================
// COMPONENT
// ============================================================
export default function ResultCheck() {
  const [modalOpen, setModalOpen] = useState(false);
  const [classnumber, setClassnumber] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [chatLink, setChatLink] = useState("");
  const [lockTimer, setLockTimer] = useState(0);
  const [checking, setChecking] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setModalOpen(true);
    setChatLink(_buildLink());
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startLockTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const remaining = _RL.getRemainingLock();
      setLockTimer(remaining);
      if (remaining <= 0) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setStep("form");
      }
    }, 1000);
  }, []);

  const handleCheck = useCallback(async () => {
    if (checking) return;

    // Rate limit check
    if (!_RL.check()) {
      setStep("locked");
      setLockTimer(_RL.getRemainingLock());
      startLockTimer();
      return;
    }

    setChecking(true);
    _RL.record();

    // Artificial delay (200-600ms) — prevents timing analysis
    await new Promise((r) =>
      setTimeout(r, 200 + Math.floor(Math.random() * 400)),
    );

    try {
      const list = await _decode();
      const trimC = classnumber.trim();
      const trimN = name.trim();

      // Input validation
      if (!/^\d{5}$/.test(trimC) || trimN.length < 1 || trimN.length > 10) {
        setStep("fail");
        setChecking(false);
        return;
      }

      const found = list.some((p) => _ceq(p.c, trimC) && _ceq(p.n, trimN));
      setStep(found ? "pass" : "fail");
    } catch {
      setStep("fail");
    }
    setChecking(false);
  }, [classnumber, name, checking, startLockTimer]);

  const handleClose = () => setModalOpen(false);

  return (
    <>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-[#002060]/20 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out]"
            onClick={handleClose}
          />

          <div className="relative z-10 w-full max-w-sm rounded-[2rem] border border-white/80 bg-white/75 p-8 text-center shadow-[0_12px_48px_rgba(0,32,96,0.14)] backdrop-blur-xl animate-[modalIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-7 h-7 flex items-center justify-center rounded-full text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-all text-sm"
              aria-label="닫기"
            >
              ✕
            </button>

            {step === "form" && (
              <>
                <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#002060] to-[#2563EB] shadow-[0_4px_14px_rgba(0,32,96,0.35)] animate-[iconPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)_0.1s_both]">
                  <span className="relative text-2xl">🔍</span>
                </div>

                <h2 className="mb-1 text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#002060] via-[#2563EB] to-[#7B9CDE]">
                  합격자 조회
                </h2>
                <p className="text-gray-400 text-xs font-medium mb-4">
                  54기 1학년 부원 모집
                </p>
                <div className="mx-auto mb-6 h-px w-12 bg-gradient-to-r from-[#002060] to-[#7B9CDE] animate-[expandLine_0.4s_ease-out_0.2s_both]" />

                <div className="flex flex-col gap-3 mb-5 animate-[fadeUp_0.4s_ease-out_0.15s_both] text-left">
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[#002060]/50 mb-1.5 pl-1">
                      학번
                    </label>
                    <input
                      type="text"
                      value={classnumber}
                      onChange={(e) => setClassnumber(e.target.value)}
                      placeholder="예) 10612"
                      maxLength={5}
                      autoComplete="off"
                      spellCheck={false}
                      className="w-full rounded-xl border border-[#002060]/10 bg-[#002060]/3 px-4 py-3 text-sm font-semibold text-gray-700 placeholder-gray-300 outline-none transition-all focus:border-[#2563EB]/40 focus:ring-2 focus:ring-[#2563EB]/10"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-[#002060]/50 mb-1.5 pl-1">
                      이름
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="예) 홍길동"
                      autoComplete="off"
                      spellCheck={false}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && classnumber && name) {
                          handleCheck();
                        }
                      }}
                      className="w-full rounded-xl border border-[#002060]/10 bg-[#002060]/3 px-4 py-3 text-sm font-semibold text-gray-700 placeholder-gray-300 outline-none transition-all focus:border-[#2563EB]/40 focus:ring-2 focus:ring-[#2563EB]/10"
                    />
                  </div>
                </div>

                <div className="animate-[fadeUp_0.4s_ease-out_0.25s_both]">
                  <button
                    onClick={handleCheck}
                    disabled={!classnumber || !name || checking}
                    className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#002060] px-8 py-3 text-base font-bold text-[#E0EBFA] shadow-[0_6px_16px_-6px_rgba(0,32,96,0.6)] transition-all duration-300 hover:shadow-[0_10px_24px_-8px_rgba(37,99,235,0.6)] hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <span className="relative flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#7B9CDE]" />
                      {checking ? "조회중..." : "조회하기"}
                    </span>
                  </button>
                </div>
              </>
            )}

            {step === "pass" && (
              <div className="animate-[modalIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
                <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#002060] to-[#2563EB] shadow-[0_4px_14px_rgba(0,32,96,0.35)] animate-[iconPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)_0.1s_both]">
                  <div
                    className="absolute inset-0 rounded-full bg-[#2563EB]/30 animate-ping opacity-40"
                    style={{ animationDuration: "2s" }}
                  />
                  <span className="relative text-2xl">🎉</span>
                </div>

                <h2 className="mb-1 text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#002060] via-[#2563EB] to-[#7B9CDE]">
                  1차 합격을 축하합니다!
                </h2>
                <p className="text-gray-400 text-xs font-medium mb-4">
                  54기 1학년 부원 모집
                </p>
                <div className="mx-auto mb-5 h-px w-12 bg-gradient-to-r from-[#002060] to-[#7B9CDE]" />

                <div className="rounded-xl bg-gradient-to-br from-[#002060]/5 to-[#2563EB]/5 border border-[#002060]/10 px-6 py-5 mb-5 animate-[fadeUp_0.4s_ease-out_0.1s_both]">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2563EB]/50 mb-2">
                    합격자
                  </p>
                  <p className="text-[#002060] font-black text-2xl tracking-tight">
                    {name}
                  </p>
                  <p className="text-[#2563EB]/60 text-sm font-semibold mt-1">
                    {classnumber}
                  </p>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-4 animate-[fadeUp_0.4s_ease-out_0.15s_both]">
                  STEMINUS 54기 1차합격을 축하드립니다!
                </p>

                <a
                  href={chatLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block w-full rounded-2xl bg-gradient-to-br from-[#FEE500] to-[#F5D800] p-4 mb-4 shadow-[0_4px_16px_rgba(254,229,0,0.35)] transition-all duration-300 hover:shadow-[0_8px_28px_rgba(254,229,0,0.5)] hover:scale-[1.02] active:scale-[0.98] animate-[fadeUp_0.4s_ease-out_0.2s_both]"
                >
                  <div className="flex items-center justify-center gap-3">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 256 256"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M128 36C70.562 36 24 72.713 24 118c0 29.279 19.466 54.97 48.748 69.477-1.593 5.494-10.237 35.344-10.581 37.689 0 0-.207 1.726.915 2.382 1.121.656 2.436.152 2.436.152 3.213-.448 37.27-24.318 43.14-28.39A165.464 165.464 0 00128 200c57.438 0 104-36.712 104-82S185.438 36 128 36z"
                        fill="#3C1E1E"
                      />
                    </svg>
                    <div className="text-left">
                      <p className="text-[#3C1E1E] font-extrabold text-base leading-tight">
                        오픈 채팅방 입장하기
                      </p>
                      <p className="text-[#3C1E1E]/50 text-[11px] font-semibold mt-0.5">
                        카카오톡 오픈채팅으로 이동합니다
                      </p>
                    </div>
                    <svg
                      className="ml-auto text-[#3C1E1E]/40 group-hover:translate-x-1 transition-transform"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </a>

                <div className="animate-[fadeUp_0.4s_ease-out_0.3s_both]">
                  <button
                    onClick={handleClose}
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
            )}

            {step === "fail" && (
              <div className="animate-[modalIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
                <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gray-400 to-gray-500 shadow-[0_4px_14px_rgba(0,0,0,0.15)] animate-[iconPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)_0.1s_both]">
                  <span className="relative text-2xl">😔</span>
                </div>

                <h2 className="mb-1 text-xl font-extrabold tracking-tight text-gray-600">
                  불합격
                </h2>
                <p className="text-gray-400 text-xs font-medium mb-4">
                  54기 1학년 부원 모집
                </p>
                <div className="mx-auto mb-5 h-px w-12 bg-gray-200" />

                <p className="text-gray-500 text-sm leading-relaxed mb-6 animate-[fadeUp_0.4s_ease-out_0.15s_both]">
                  아쉽게도 이번에는 함께하지 못하게 되었습니다.
                  <br />
                  다음 기회에 다시 도전해 주세요.
                </p>

                <div className="flex flex-col gap-2 animate-[fadeUp_0.4s_ease-out_0.25s_both]">
                  <button
                    onClick={handleClose}
                    className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gray-700 px-8 py-3 text-base font-bold text-white/90 shadow-sm transition-all duration-300 hover:bg-gray-800 hover:scale-[1.02] active:scale-95"
                  >
                    <span className="relative flex items-center gap-2">
                      확인
                    </span>
                  </button>
                  <button
                    onClick={() => setStep("form")}
                    className="w-full py-2 text-xs text-gray-300 hover:text-gray-500 transition-colors underline-offset-2 hover:underline"
                  >
                    다시 조회하기
                  </button>
                </div>
              </div>
            )}

            {step === "locked" && (
              <div className="animate-[modalIn_0.35s_cubic-bezier(0.34,1.56,0.64,1)]">
                <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-[0_4px_14px_rgba(220,38,38,0.35)] animate-[iconPop_0.4s_cubic-bezier(0.34,1.56,0.64,1)_0.1s_both]">
                  <span className="relative text-2xl">🔒</span>
                </div>

                <h2 className="mb-1 text-xl font-extrabold tracking-tight text-red-600">
                  조회 제한
                </h2>
                <p className="text-gray-400 text-xs font-medium mb-4">
                  너무 많은 시도가 감지되었습니다
                </p>
                <div className="mx-auto mb-5 h-px w-12 bg-red-200" />

                <div className="rounded-xl bg-red-50 border border-red-100 px-6 py-5 mb-6">
                  <p className="text-red-400 text-sm">
                    {lockTimer > 0
                      ? `${Math.floor(lockTimer / 60)}분 ${lockTimer % 60}초 후 다시 시도해주세요`
                      : "잠시 후 다시 시도해주세요"}
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gray-700 px-8 py-3 text-base font-bold text-white/90 shadow-sm transition-all duration-300 hover:bg-gray-800 hover:scale-[1.02] active:scale-95"
                >
                  <span className="relative flex items-center gap-2">닫기</span>
                </button>
              </div>
            )}
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
    </>
  );
}
