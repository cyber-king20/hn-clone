export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto p-4">
      <div className="space-y-4">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </main>
  );
} 