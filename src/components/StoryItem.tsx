import { formatTime } from '@/lib/utils';
import { Story } from '@/types';
import Link from 'next/link';

export default function StoryItem({ story, index }: { story: Story, index:number }) {
  const domain = story.url ? new URL(story.url).hostname : null;

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
    </article>
  );
}

