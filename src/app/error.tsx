'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="max-w-6xl mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="bg-orange-500 text-white px-4 py-2 rounded"
      >
        Try again
      </button>
    </main>
  );
} 