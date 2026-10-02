"use client";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isPlanPage = pathname.startsWith("/my-plan");

  const background = isHome ? "bg-[#090a0d] border-[#1a1d24]" : "bg-dark border-[#1b1f28]";
  const spacing = isHome ? "py-10" : isPlanPage ? "py-6" : "py-8";
  const width = isPlanPage ? "max-w-[1280px] px-6 sm:px-12" : "max-w-[1232px] px-6";

  return (
    <footer className={`border-t ${background}`}>
      <div
        className={`mx-auto flex flex-col items-center justify-between gap-3 sm:flex-row ${spacing} ${width}`}
      >
        <Logo small />
        <p className="text-center text-xs text-[#6b7280]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
