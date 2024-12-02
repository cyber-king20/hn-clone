import PageHeading from '@/components/PageHeading';
import Pagination from '@/components/Pagination';
import StoryItem from '@/components/StoryItem';
import { fetchStories } from '@/lib/api';
import { STORIES_PER_PAGE } from '@/lib/constants';
import { PageProps } from '@/types';

// Mark the component as a Server Component
export default async function Home({
  searchParams,
}:  PageProps) {

  const {page} = await searchParams;
  const pageNumber = Number(page) || 1;
  const { stories, totalPages } = await fetchStories('top', pageNumber);

  return (
    <main className="max-w-6xl mx-auto p-4">
      <PageHeading title='Top Stories'/>
      <div className="space-y-2 ">
        {stories.map((story, idx) => (
          <StoryItem key={story.id} story={story} index={((pageNumber - 1) * STORIES_PER_PAGE )+ idx + 1} />
        ))}
      </div>
      <Pagination totalPages={totalPages} />
    </main>
  );
}

// Generate metadata dynamically
export async function generateMetadata() {
  return {
    title: 'Top Stories | Hacker News Clone',
    description: 'Latest top stories from Hacker News',
  };
}