import { Clock, Flame, Star } from "lucide-react";
import { formatKcal, formatMinutes } from "@/lib/api";

export default function Stats({ workout, className = "" }) {
  return (
    <div className={`flex flex-wrap items-center text-xs leading-4 ${className}`}>
      <span className="flex items-center gap-1.5">
        <Clock size={14} aria-hidden /> {formatMinutes(workout.duration)}
      </span>
      <span className="flex items-center gap-1.5">
        <Flame size={14} aria-hidden /> {formatKcal(workout.calories)}
      </span>
      <span className="flex items-center gap-1.5">
        <Star size={14} aria-hidden className="fill-lime2 text-lime2" /> {workout.rating}
      </span>
    </div>
  );
}
