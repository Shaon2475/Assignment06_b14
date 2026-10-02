import Link from "next/link";
import { Check, X } from "lucide-react";
import Stats from "./Stats";

export default function PlanRow({ workout, showDone, done, onDone, onRemove }) {
  return (
    <li
      className={`flex flex-col gap-4 rounded-2xl border border-line2 bg-row p-4 sm:flex-row sm:items-center sm:justify-between ${
        done ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="h-20 w-36 shrink-0 overflow-hidden rounded-xl bg-[#1f2937]">
          {workout.image ? (
            <img src={workout.image} alt={workout.name} className="h-full w-full object-cover" />
          ) : null}
        </div>

        <div className="min-w-0">
          <h3 className="font-display text-base font-bold uppercase leading-6 tracking-[0.4px] text-white">
            {workout.name}
          </h3>
          <p className="mt-0.5 text-xs leading-4 text-muted2">{workout.equipment}</p>
          <Stats workout={workout} className="mt-2 gap-2 text-[#d1d5db]" />
        </div>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-center">
        <Link
          href={`/workouts/${workout.id}`}
          className="rounded-full border border-[#374151] px-[18px] py-2 text-xs leading-4 text-white transition hover:bg-[#1f242d]"
        >
          View Details
        </Link>

        {showDone ? (
          <button
            onClick={onDone}
            disabled={done}
            className="flex items-center gap-1 rounded-full bg-lime px-4 py-2 text-xs font-semibold leading-4 text-black transition hover:brightness-95 disabled:cursor-default disabled:opacity-60"
          >
            <Check size={14} aria-hidden />
            {done ? "Done" : "Mark as Done"}
          </button>
        ) : null}

        <button
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-[#374151] text-muted transition hover:border-red-400 hover:text-red-400"
        >
          <X size={16} aria-hidden />
        </button>
      </div>
    </li>
  );
}
