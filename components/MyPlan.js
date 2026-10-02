"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";
import Spinner from "./Spinner";
import ErrorBox from "./ErrorBox";
import PlanRow from "./PlanRow";

const sorters = {
  duration: (a, b) => a.duration - b.duration,
  calories: (a, b) => a.calories - b.calories,
  rating: (a, b) => b.rating - a.rating,
};

export default function MyPlan() {
  const { toast } = useToast();
  const { ready, planIds, savedIds, doneIds, removeFromPlan, removeFromSaved, markDone } =
    usePlan();

  const [allWorkouts, setAllWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  async function loadWorkouts() {
    setLoading(true);
    setError("");
    try {
      setAllWorkouts(await getWorkouts());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWorkouts();
  }, []);

  const planItems = allWorkouts.filter((workout) => planIds.includes(workout.id));
  const savedItems = allWorkouts.filter((workout) => savedIds.includes(workout.id));

  const totalMinutes = planItems.reduce((sum, workout) => sum + workout.duration, 0);
  const totalCalories = planItems.reduce((sum, workout) => sum + workout.calories, 0);

  const currentItems = tab === "plan" ? planItems : savedItems;
  const sortedItems = [...currentItems].sort(sorters[sortBy]);

  function handleRemove(workout) {
    if (tab === "plan") {
      removeFromPlan(workout.id);
      toast("Removed from today's plan", "info");
    } else {
      removeFromSaved(workout.id);
      toast("Removed from saved", "info");
    }
  }

  function handleDone(workout) {
    markDone(workout.id);
    toast(`${workout.name} marked as done`, "success");
  }

  const metrics = [
    ["Exercises", planItems.length, "text-lime"],
    ["Minutes", totalMinutes, "text-white"],
    ["Calories", totalCalories, "text-white"],
  ];

  function tabClass(active) {
    if (active) {
      return "rounded-lg border border-[#2b303d] bg-[#1f242d] px-4 py-1.5 text-xs font-bold leading-4 text-white";
    }
    return "rounded-lg border border-transparent px-4 py-1.5 text-xs leading-4 text-muted2 hover:text-white";
  }

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-16 pt-10 sm:px-12">
      <h1 className="font-display text-[30px] font-bold uppercase leading-9 tracking-[-0.75px]">
        My Plan
      </h1>
      <p className="mt-2 text-sm leading-5 text-muted2">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 grid gap-6 rounded-2xl border border-line2 bg-panel2 px-6 py-[30px] sm:grid-cols-3 sm:gap-0">
        {metrics.map(([label, value, color], index) => (
          <div
            key={label}
            className={index > 0 ? "sm:border-l sm:border-line2 sm:pl-8" : ""}
          >
            <p className="text-xs leading-4 text-muted2">{label}</p>
            <p className={`mt-1 font-display text-4xl font-bold leading-10 ${color}`}>
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1 rounded-xl border border-line2 bg-[#151921] p-1">
          <button onClick={() => setTab("plan")} className={tabClass(tab === "plan")}>
            Today&apos;s Plan
          </button>
          <button onClick={() => setTab("saved")} className={tabClass(tab === "saved")}>
            Saved
          </button>
        </div>

        <label className="flex items-center gap-3 text-xs text-muted2">
          Sort By
          <span className="relative">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="appearance-none rounded-[9px] border border-line2 bg-panel2 py-2 pl-2.5 pr-8 text-xs leading-4 text-white"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown
              size={14}
              aria-hidden
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
            />
          </span>
        </label>
      </div>

      <div className="mt-6">
        {loading || !ready ? (
          <Spinner label="Loading workouts…" />
        ) : error ? (
          <ErrorBox message={error} onRetry={loadWorkouts} />
        ) : sortedItems.length === 0 ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-[#111317] px-6 text-center">
            <h2 className="font-display text-xl font-bold uppercase leading-5 tracking-[0.7px]">
              Nothing here yet
            </h2>
            <p className="mt-2 text-xs leading-4 text-[#a1a1aa]">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex h-9 items-center rounded-full bg-[#c2f10d] px-6 text-xs font-semibold tracking-[-0.3px] text-black hover:brightness-95"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {sortedItems.map((workout) => (
              <PlanRow
                key={workout.id}
                workout={workout}
                showDone={tab === "plan"}
                done={doneIds.includes(workout.id)}
                onDone={() => handleDone(workout)}
                onRemove={() => handleRemove(workout)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
