export default function Spinner({ label = "Loading workouts…" }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-4 py-24 text-muted"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2b303d] border-t-lime" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
