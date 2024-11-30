'use client';

import { formatTime } from '@/lib/utils';
import { Story, Comment } from '@/types';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StoryItem({ story, index }: { story: Story, index:number }) {
  const domain = story.url ? new URL(story.url).hostname : null;
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);
      fetch(`/api/comments/${story.id}`)
        .then(res => res.json())
        .then(data => {
          setComments(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
          setIsLoading(false);
        });
    }
  }, [showComments, story.id]);

  return (
    <article className="py-2 hover:bg-gray-50 border shadow-lg p-4 rounded-lg">
      <div className="flex gap-2">
        <span className="text-gray-500 min-w-[20px] text-right">{index}</span>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <a 
              href={story.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline text-gray-900"
            >
              {story.title}
            </a>
            {domain && (
              <span className="text-xs text-gray-500">({domain})</span>
            )}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            by{" "}
            <Link 
              href={`/user/${story.by}`}
              className="hover:underline text-gray-600"
            >
              {story.by}
            </Link>
            {" | "}
            {formatTime(story.time)} | {' '}
            {story.descendants > 0 ? (
              <Link 
                href={`/item/${story.id}`}
                className="hover:underline cursor-pointer"
              >
                {story.descendants} comments
              </Link>
            ) : (
              <span className="text-gray-500">0 comments</span>
            )}
          </div>
        </div>
      </div>
      
      {/* <button 
        onClick={() => setShowComments(!showComments)}
        className="text-gray-500 text-sm hover:text-gray-700"
      >
        {showComments ? 'Hide Comments' : `${story.descendants || 0} comments`}
      </button> */}

      {/* {showComments && (
        <div className="mt-2 ml-8">
          {isLoading ? (
            <p>Loading comments...</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="text-sm">
                  <div className="text-gray-500 text-xs">
                    {comment.by} | {formatTime(comment.time)}
                  </div>
                  <div 
                    className="mt-1 text-black" 
                    dangerouslySetInnerHTML={{ __html: comment.text || '' }} 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )} */}
    </article>
  );
}

