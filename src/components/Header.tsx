'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-orange-500 p-2">
      <nav className="max-w-6xl mx-auto flex items-center gap-4">
        <Link href="/" className="font-bold text-white">
          Hacker News
        </Link>
        <div className="flex gap-4 text-sm">
          {/* <Link 
            href="/"
            className={pathname === '/' ? 'text-white' : 'text-gray-100'}
          >
            top
          </Link> */}
          <Link 
            href="/new"
            className={pathname === '/new' ? 'text-white' : 'text-gray-100'}
          >
            New
          </Link>
          <Link 
            href="/best"
            className={pathname === '/best' ? 'text-white' : 'text-gray-100'}
          >
            Best
          </Link>
        </div>
      </nav>
    </header>
  );
} 