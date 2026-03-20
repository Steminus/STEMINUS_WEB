"use client";

import { useEffect, useState } from "react";

// import { useState } from "react";
// import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// import { auth, firebaseConfigError } from "@/lib/firebase";

// const provider = new GoogleAuthProvider();

const message = "아직 만들고 있어요.";
const typingSpeed = 120;
const deletingSpeed = 70;
const holdDelay = 5000;

export default function LoginPage() {
  const [typedText, setTypedText] = useState("");

  //   const [pending, setPending] = useState(false);
  //   const [error, setError] = useState<string | null>(firebaseConfigError);

  //   const handleGoogleLogin = async () => {
  //     if (firebaseConfigError) {
  //       setError(firebaseConfigError);
  //       return;
  //     }

  //     setPending(true);
  //     setError(null);

  //     try {
  //       const result = await signInWithPopup(auth, provider);
  //       const email = result.user.email?.toLowerCase() ?? "";

  //       if (!email.endsWith("@dshs.kr")) {
  //         await signOut(auth);
  //         setError("Only dshs.kr accounts can sign in.");
  //       }
  //     } catch (loginError) {
  //       setError(
  //         loginError instanceof Error
  //           ? loginError.message
  //           : "Google login failed.",
  //       );
  //     } finally {
  //       setPending(false);
  //     }
  //   };

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: number;

    const tick = () => {
      if (isDeleting) {
        currentIndex -= 1;
      } else {
        currentIndex += 1;
      }

      setTypedText(message.slice(0, currentIndex));

      if (currentIndex >= message.length) {
        isDeleting = true;
        timeoutId = window.setTimeout(tick, holdDelay);
        return;
      }

      if (currentIndex <= 0 && isDeleting) {
        isDeleting = false;
      }

      timeoutId = window.setTimeout(
        tick,
        isDeleting ? deletingSpeed : typingSpeed,
      );
    };

    timeoutId = window.setTimeout(tick, typingSpeed);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <main className="flex min-h-[calc(100svh-73px)] items-center justify-center px-4 sm:px-6">
      {/* <div className="w-full max-w-sm">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={pending}
          className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {pending ? "Signing in..." : "Continue with Google"}
        </button>

        {error ? (
          <p className="mt-3 text-center text-sm text-red-600">{error}</p>
        ) : null}
      </div> */}
      <h1 className="text-center text-2xl font-semibold sm:text-3xl">
        {typedText}
        <span className="typing-cursor ml-1 inline-block h-[1em] w-[2px] bg-current align-[-0.1em]" />
      </h1>
      <style jsx>{`
        .typing-cursor {
          animation: cursor-blink 0.9s steps(1) infinite;
        }

        @keyframes cursor-blink {
          0%,
          45% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </main>
  );
}
