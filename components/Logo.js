import Link from "next/link";

export default function Logo({ small = false, big = false }) {
  const iconSize = small ? "h-5 w-5" : "h-7 w-7";
  let textSize = "text-[18px] tracking-[0.9px]";
  if (small) textSize = "text-[14px] tracking-[0.7px]";
  if (big) textSize = "text-[20px] tracking-[1px]";

  return (
    <Link
      href="/"
      aria-label="FitLog home"
      className={`flex items-center ${small ? "gap-2" : "gap-2.5"}`}
    >
      <img src="/logo.png" alt="" className={iconSize} />
      <span className={`font-display font-bold uppercase text-white ${textSize}`}>
        FitLog
      </span>
    </Link>
  );
}
