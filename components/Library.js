"use client";
import { useEffect, useState } from "react";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";
import Spinner from "./Spinner";
import ErrorBox from "./ErrorBox";

export default function Library() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadWorkouts() {
    setLoading(true);
    setError("");
    try {
      const data = await getWorkouts();
      setWorkouts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWorkouts();
  }, []);

  return (
    <section id="library" className="mx-auto max-w-[1232px] scroll-mt-24 px-6 pb-[78px] pt-16">
      <h2 className="font-display text-[30px] font-bold uppercase leading-9 tracking-[-0.75px]">
        The Library
      </h2>
      <p className="mt-1 text-sm leading-5 text-muted">
        Twelve lifts covering every major muscle group.
      </p>

      <div className="mt-8">
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorBox message={error} onRetry={loadWorkouts} />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
