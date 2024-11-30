import { StoryType } from "@/types";
import { BASE_URL } from "./constants";



export async function fetchStories(type: StoryType, page: number = 1) {
  const response = await fetch(`${BASE_URL}/${type}stories.json`);
  const storyIds = await response.json();
  
  const start = (page - 1) * 30;
  const end = start + 30;
  const pageStoryIds = storyIds.slice(start, end);
  
  const stories = await Promise.all(
    pageStoryIds.map((id: number) => fetchStoryDetails(id))
  );

  return {
    stories: stories.filter(Boolean),
    totalPages: Math.ceil(storyIds.length / 30)
  };
}

export async function fetchStoryDetails(id: number) {
  const response = await fetch(`${BASE_URL}/item/${id}.json`);
  return response.json();
}

export async function fetchComments(ids: number[]) {
  return Promise.all(
    ids.map(async (id) => {
      const response = await fetch(`${BASE_URL}/item/${id}.json`);
      return response.json();
    })
  );
}

export async function fetchUserDetails(id: string) {
  const response = await fetch(`${BASE_URL}/user/${id}.json`);
  return response.json();
}