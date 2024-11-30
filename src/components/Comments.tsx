import { fetchStoryDetails } from '@/lib/api';
import { Suspense } from 'react';
import { CommentTree } from './CommentTree';



export default async function Comments({ storyId }: { storyId: number }) {
  const story = await fetchStoryDetails(storyId);
  
  if (!story?.kids?.length) {
    return <div className="text-black">No comments yet.</div>;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">
        {story.descendants} Comments
      </h2>
      <div className="space-y-6">
        <Suspense fallback={<div className="text-sm text-black">Loading comments...</div>}>
          {story.kids.map((kidId: number) => (
            <CommentTree key={kidId} commentId={kidId} />
          ))}
        </Suspense>
      </div>
    </section>
  );
}
