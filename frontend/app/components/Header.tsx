"use client";

import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getClientAuth } from "@/lib/firebase";
import { formatName } from "@/lib/formatName";
import logo from "@/app/logo.png";

const centerNavItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/activity", label: "Activity" },
  { href: "/apply", label: "Apply" },
];

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const auth = getClientAuth();

    if (!auth) {
      setUser(null);
      return;
    }

    setUser(auth.currentUser);
    return onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const label = user?.displayName
    ? formatName(user.displayName)
    : user?.email?.split("@")[0] ?? "Login";

  const handleLogout = async () => {
    const auth = getClientAuth();

    if (!auth) {
      return;
    }

    await signOut(auth);
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="justify-self-start"
          >
            <Image
              src={logo}
              alt="STEMINUS logo"
              className="h-9 w-auto sm:h-10"
              priority
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex flex-wrap items-center justify-center gap-2 text-sm text-black">
              {centerNavItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`rounded-full px-4 py-2 transition ${
                        isActive
                          ? "bg-slate-200 text-black"
                          : "hover:bg-slate-100 hover:text-black"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-black transition hover:bg-slate-100 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="flex flex-col gap-1">
              <span className={`block h-0.5 w-4 bg-current transition-transform ${mobileMenuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-4 bg-current transition-opacity ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block h-0.5 w-4 bg-current transition-transform ${mobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>

          <div className="hidden md:block">
          {user ? (
            <div ref={menuRef} className="relative justify-self-end">
              <button
                type="button"
                onClick={() => setUserMenuOpen((open) => !open)}
                className="rounded-full px-4 py-2 text-sm text-black transition hover:bg-slate-100 hover:text-black"
              >
                {label}
              </button>

              {userMenuOpen ? (
                <div className="absolute right-0 top-full mt-2 w-32 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-xl px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <Link
              href="/login"
              className={`justify-self-end rounded-full px-4 py-2 text-sm text-black transition ${
                pathname === "/login"
                  ? "bg-slate-200"
                  : "hover:bg-slate-100 hover:text-black"
              }`}
            >
              {label}
            </Link>
          )}
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] overflow-hidden bg-slate-950/35 transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 flex h-full w-4/5 max-w-sm flex-col border-l border-slate-300 bg-white px-5 py-6 shadow-2xl transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-semibold tracking-[0.2em] text-slate-500">
              MENU
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-black transition hover:bg-slate-100"
              aria-label="Close navigation menu"
            >
              <span className="relative block h-4 w-4">
                <span className="absolute left-1/2 top-1/2 block h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
                <span className="absolute left-1/2 top-1/2 block h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav aria-label="Mobile navigation">
            <ul className="flex flex-col gap-2 text-base text-black">
              {centerNavItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block rounded-2xl px-4 py-3 transition ${
                        isActive
                          ? "bg-slate-200 text-black"
                          : "hover:bg-slate-100 hover:text-black"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto border-t border-slate-200 pt-4">
            {user ? (
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-sm font-medium text-black">{label}</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-full bg-red-50 px-4 py-2 text-sm text-red-600 transition hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm text-black transition hover:bg-slate-200"
              >
                {label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
