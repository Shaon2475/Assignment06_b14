import Link from "next/link";

export default function NotFoundBlock() {
  return (
    <div className="mx-auto flex max-w-[1232px] flex-col items-center px-6 py-24 text-center">
      <p className="font-display text-8xl font-bold text-lime">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide">
        Workout not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        We could not find that lift. Pick another one from the library.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-lime px-6 py-2.5 text-xs font-semibold text-black hover:brightness-95"
      >
        Go to workouts
      </Link>
    </div>
  );
}
