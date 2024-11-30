import { Suspense } from 'react';
import Link from 'next/link';
import { fetchComments } from '@/lib/api';
import { formatTime } from '@/lib/utils';

export async function CommentTree({ commentId }: { commentId: number }) {
  const comments = await fetchComments([commentId]);
  const comment = comments[0];

  if (!comment) return null;

  // If comment has no text but has children, skip directly to children
  if (!comment.text && comment.kids) {
    return (
      <div className="mt-4">
        <Suspense fallback={<div className="text-sm text-gray-500">Loading replies...</div>}>
          {comment.kids.map((kidId: number) => (
            <CommentTree key={kidId} commentId={kidId} />
          ))}
        </Suspense>
      </div>
    );
  }

  // If comment has no text and no children, don't render anything
  if (!comment.text && !comment.kids) {
    return null;
  }

  return (
    <div className="border-l-2 border-gray-200 pl-4 ml-2 mt-2 text-sm">
      <div className="text-sm mb-2">
        <Link 
          href={`/user/${comment.by}`}
          className="text-gray-600 hover:underline font-medium"
        >
          {comment.by}
        </Link>
        {' '}
        <span className="text-gray-400">{formatTime(comment.time)}</span>
      </div>
      <div 
        className="[&>p]:mt-3 prose prose-sm bg-gray-50 p-3 border rounded-lg shadow-sm bg-orange-100 text-gray-800"
        dangerouslySetInnerHTML={{ __html: comment.text || '' }}
      />
      
      {comment.kids && comment.kids.length > 0 && (
        <div className="mt-4">
          <Suspense fallback={<div className="text-sm text-gray-500">Loading replies...</div>}>
            {comment.kids.map((kidId: number) => (
              <CommentTree key={kidId} commentId={kidId} />
            ))}
          </Suspense>
        </div>
      )}
    </div>
  );
}