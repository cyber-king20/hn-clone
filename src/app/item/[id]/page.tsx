import { notFound } from 'next/navigation';
import { fetchStoryDetails } from '@/lib/api';
import { CommentTree } from '@/components/CommentTree';
export default async function StoryPage({ params }: { params: { id: string } }) {
  const {id} = await params;
  const story = await fetchStoryDetails(id);
  
  if (!story) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      <article className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">{story.title}</h1>
        {story.url && (
          <a 
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:underline"
          >
            ({new URL(story.url).hostname})
          </a>
        )}
        <div className="mt-4 text-sm text-gray-600">
          {story.score} points by {story.by}
        </div>
      </article>
      
      {/* <Comments storyId={params.id} /> */}
      <CommentTree commentId={story.id} />
    </main>
  );
}

// Generate metadata for the story page
export async function generateMetadata({ params }: { params: { id: string } }) {
  const story = await fetchStoryDetails(params.id);
  
  if (!story) {
    return {
      title: 'Story Not Found',
    };
  }

  return {
    title: story.title,
    description: `${story.title} - Posted by ${story.by}`,
  };
}