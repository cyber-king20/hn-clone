export type StoryType = 'top' | 'new' | 'best';

export type PageProps = {
  searchParams: Promise<{ page?: string }>;
};

export interface Story {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
  kids?: number[];
}

