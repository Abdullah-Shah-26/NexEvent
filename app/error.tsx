"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-light-200 mb-6">
          {error.message || "An unexpected error occurred"}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#7c3aed] hover:bg-[#6d28d9] rounded-md transition-colors text-white font-semibold"
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors text-white font-semibold"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
