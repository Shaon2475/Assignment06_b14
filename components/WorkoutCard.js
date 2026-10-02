import Link from "next/link";
import Stats from "./Stats";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-panel transition hover:border-[#3a4150]"
    >
      <div className="h-48 w-full overflow-hidden bg-[#0f1115]">
        {workout.image ? (
          <img
            src={workout.image}
            alt={workout.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {workout.categories.map((category) => (
            <span
              key={category}
              className="rounded-full bg-lime2 px-2.5 py-0.5 text-[11px] font-bold uppercase leading-[16.5px] tracking-[0.55px] text-black"
            >
              {category}
            </span>
          ))}
        </div>

        <h3 className="mt-1 pt-2 font-display text-lg font-bold uppercase leading-7 tracking-[0.45px] text-white">
          {workout.name}
        </h3>
        <p className="mt-1 text-xs leading-4 text-muted">{workout.equipment}</p>

        <div className="mt-auto pt-4">
          <Stats workout={workout} className="gap-4 border-t border-[#20242e] pt-3 text-muted" />
        </div>
      </div>
    </Link>
  );
}
