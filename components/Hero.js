import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1232px] px-6 pt-12">
      <div className="flex flex-col items-center justify-between gap-10 rounded-2xl border border-line bg-panel p-8 sm:p-[57px] md:flex-row">
        <div className="w-full md:max-w-[558px]">
          <p className="pt-1.5 text-[11px] font-bold uppercase leading-[16.5px] tracking-[1.1px] text-lime2">
            Workout Library
          </p>

          <h1 className="mt-5 font-display text-[40px] font-bold uppercase leading-none tracking-[-1.5px] sm:text-[52px] lg:text-[60px]">
            Train with intent. Log
            <br className="hidden lg:inline" /> every set.
          </h1>

          <p className="mt-5 max-w-[512px] text-base leading-6 text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
            today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="mt-7 inline-flex h-10 items-center gap-1.5 rounded-md bg-lime2 px-6 text-xs font-bold uppercase tracking-[0.3px] text-black hover:brightness-95"
          >
            Browse Workouts
            <ArrowDown size={14} aria-hidden />
          </a>
        </div>

        <img
          src="/banner.png"
          alt="Muscle anatomy figure on a preacher curl machine"
          className="h-auto w-full max-w-[334px] shrink-0 md:h-[334px] md:w-[334px]"
        />
      </div>
    </section>
  );
}
