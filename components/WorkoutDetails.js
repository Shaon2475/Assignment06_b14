"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Bookmark, Plus } from "lucide-react";
import { getWorkout, formatKcal, formatMinutes } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";
import Spinner from "./Spinner";
import ErrorBox from "./ErrorBox";
import NotFoundBlock from "./NotFoundBlock";

export default function WorkoutDetails() {
  const { id } = useParams();
  const { toast } = useToast();
  const { planIds, isPlanFull, addToPlan, addToSaved } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadWorkout() {
      setLoading(true);
      setError("");
      try {
        const data = await getWorkout(id);
        if (!ignore) setWorkout(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadWorkout();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) return <Spinner label="Loading workout…" />;
  if (error) {
    return (
      <div className="px-6 py-16">
        <ErrorBox message={error} />
      </div>
    );
  }
  if (!workout) return <NotFoundBlock />;

  const alreadyInPlan = planIds.includes(workout.id);
  const planButtonDisabled = isPlanFull && !alreadyInPlan;

  function handleAddToPlan() {
    const result = addToPlan(workout.id);
    if (result === "added") toast("Added to today's plan", "success");
    if (result === "exists") toast("Already in today's plan", "info");
    if (result === "full") toast("Today's plan is full (5 lifts max)", "error");
  }

  function handleSave() {
    const result = addToSaved(workout.id);
    if (result === "added") toast("Saved for later", "success");
    if (result === "exists") toast("Already saved", "info");
  }

  const specs = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", formatMinutes(workout.duration)],
    ["Calories", formatKcal(workout.calories)],
    ["Rating", workout.rating],
  ];

  return (
    <div className="mx-auto grid max-w-[1232px] gap-10 px-6 pt-12 lg:grid-cols-2 lg:gap-14">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#232834] bg-[#171a21] lg:sticky lg:top-24 lg:self-start">
        {workout.image ? (
          <img src={workout.image} alt={workout.name} className="h-full w-full object-cover" />
        ) : null}
      </div>

      <div>
        <h1 className="font-display text-4xl font-bold uppercase leading-10 tracking-[-0.9px]">
          {workout.name}
        </h1>

        {workout.description ? (
          <p className="mt-3 text-base leading-6 text-muted">{workout.description}</p>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          {workout.categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-lime px-3.5 py-1 text-xs font-semibold capitalize leading-4 text-dark"
            >
              {category.toLowerCase()}
            </span>
          ))}
        </div>

        <dl className="mt-7 overflow-hidden rounded-2xl border border-[#232834] bg-[#151922]">
          {specs.map(([label, value], index) => (
            <div
              key={label}
              className={`flex items-center justify-between px-6 py-3.5 ${
                index < specs.length - 1 ? "border-b border-[#1e2330]" : ""
              }`}
            >
              <dt className="text-xs font-bold uppercase leading-4 tracking-[0.6px] text-muted">
                {label}
              </dt>
              <dd className="text-sm font-medium leading-5 text-[#e5e7eb]">{value}</dd>
            </div>
          ))}
        </dl>

        {workout.instructions.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-base font-extrabold uppercase leading-6 tracking-[0.8px]">
              Instructions
            </h2>
            <ol className="mt-4 space-y-3">
              {workout.instructions.map((step, index) => (
                <li key={index} className="flex gap-2 text-sm leading-[22.75px]">
                  <span className="text-muted">{index + 1}.</span>
                  <span className="text-[#d1d5db]">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <button
            onClick={handleAddToPlan}
            disabled={planButtonDisabled}
            title={planButtonDisabled ? "Your plan already has 5 lifts" : undefined}
            className="flex items-center gap-2 rounded-xl bg-lime px-6 py-3 text-sm font-semibold leading-5 text-dark transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={16} aria-hidden />
            Add to today&apos;s plan
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl border border-[#374151] px-6 py-3 text-sm font-medium leading-5 text-[#e5e7eb] transition hover:bg-[#1f242d]"
          >
            <Bookmark size={16} aria-hidden />
            Save for later
          </button>
        </div>
      </div>
    </div>
  );
}
