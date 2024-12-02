import { CommentTree } from '@/components/CommentTree';
import { fetchStoryDetails } from '@/lib/api';
import { notFound } from 'next/navigation';

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function StoryPage({ params }: PageProps) {
    const { id } = await params;
    const story = await fetchStoryDetails(Number(id));

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

            <CommentTree commentId={story.id} />
        </main>
    );
}