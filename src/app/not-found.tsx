import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="max-w-6xl mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="mb-4">The page you're looking for doesn't exist.</p>
      <Link 
        href="/"
        className="text-orange-500 hover:underline"
      >
        Go back home
      </Link>
    </main>
  );
} 