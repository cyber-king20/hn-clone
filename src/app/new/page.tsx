import { Suspense } from 'react';
import { fetchStories } from '@/lib/api';
import StoryItem from '@/components/StoryItem';
import Pagination from '@/components/Pagination';
import Loading from '../loading';
import PageHeading from '@/components/PageHeading';
import { STORIES_PER_PAGE } from '@/lib/constants';

export default async function NewStories({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const {page} = await searchParams;
  const pageNumber = Number(page) || 1;
  const { stories, totalPages } = await fetchStories('new', pageNumber);

  return (
    <main className="max-w-6xl mx-auto p-4">
      <PageHeading title='New Stories'/>
      <Suspense fallback={<Loading />}>
        <div className="space-y-2">
          {stories.map((story, idx) => (
            <StoryItem key={story.id} story={story} index={((pageNumber - 1) * STORIES_PER_PAGE )+ idx + 1} />
          ))}
        </div>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </main>
  );
}

export async function generateMetadata() {
  return {
    title: 'New Stories | Hacker News Clone',
    description: 'Latest new stories from Hacker News',
  };
}