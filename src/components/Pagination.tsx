'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  return (
    <div className="flex justify-center items-center gap-4 py-4">
      <button
        disabled={currentPage === 1}
        onClick={() => router.push(`?page=${currentPage - 1}`)}
        className="disabled:opacity-50"
      >
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => router.push(`?page=${currentPage + 1}`)}
        className="disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
