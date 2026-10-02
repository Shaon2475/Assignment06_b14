"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const { planIds, savedIds } = usePlan();

  const isHome = pathname === "/";
  const isPlanPage = pathname.startsWith("/my-plan");

  const headerColor = isHome ? "bg-ink" : "bg-dark";
  const headerHeight = isPlanPage ? "sm:h-[67px]" : "sm:h-[81px]";
  const width = isPlanPage ? "max-w-[1280px] px-6 sm:px-12" : "max-w-[1232px] px-6";

  function linkClass(active) {
    if (active) {
      return "rounded-full bg-limebg px-4 py-1.5 text-xs font-semibold text-lime2";
    }
    return "rounded-full px-4 py-1.5 text-xs font-medium text-muted hover:text-white";
  }

  return (
    <header className={`sticky top-0 z-40 border-b border-[#1b1f28] ${headerColor}`}>
      <div
        className={`mx-auto flex flex-wrap items-center justify-between gap-y-2 py-3 sm:flex-nowrap sm:py-0 ${headerHeight} ${width}`}
      >
        <div className="order-1">
          <Logo big={!isHome} />
        </div>

        <nav className="order-3 flex w-full items-center justify-center gap-0.5 sm:order-2 sm:w-auto">
          <Link href="/" className={linkClass(isHome)}>
            Workouts
          </Link>
          <Link href="/my-plan" className={linkClass(isPlanPage)}>
            My Plan
          </Link>
        </nav>

        <div className="order-2 flex items-center gap-6 sm:order-3">
          <Link
            href="/my-plan"
            aria-label={`Plan, ${planIds.length} items`}
            className="flex items-center gap-2 text-xs font-medium text-[#d1d5db]"
          >
            Plan
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime2 px-1 text-[11px] font-bold text-black">
              {planIds.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            aria-label={`Saved, ${savedIds.length} items`}
            className="flex items-center gap-2 text-xs font-medium text-muted"
          >
            Saved
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#2d313b] px-1 text-[11px] font-medium text-[#d1d5db]">
              {savedIds.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
