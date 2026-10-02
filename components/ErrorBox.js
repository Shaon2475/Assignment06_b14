export default function ErrorBox({ message, onRetry }) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-line bg-panel p-8 text-center">
      <h3 className="font-display text-xl font-bold uppercase tracking-wide">
        Could not load workouts
      </h3>
      <p className="mt-2 text-sm text-muted">{message || "Check your connection and try again."}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 rounded-full bg-lime px-5 py-2 text-xs font-semibold text-black hover:brightness-95"
        >
          Try again
        </button>
      )}
    </div>
  );
}
