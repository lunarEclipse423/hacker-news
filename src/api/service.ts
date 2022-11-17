import axios from "axios";
import { IStory } from "../types/story";
import { IComment } from "../types/comment";

const baseUrl = "https://hacker-news.firebaseio.com/v0/";
const storiesIdsUrl = `${baseUrl}newstories.json?print=pretty`;
const storyUrl = `${baseUrl}item/`;
const commentUrl = `${baseUrl}item/`;
const newestStoriesMaxAmount = 100;

export const getStoriesIds = async (): Promise<number[]> => {
  const newestStoriesIds = await axios
    .get(storiesIdsUrl)
    .then((response) =>
      response.data.sort((a: number, b: number) => b - a).slice(0, newestStoriesMaxAmount)
    )
    .catch((error) => console.log(`Error in getStoriesIds: ${error}`));
  return newestStoriesIds;
};

export const getStoryInfo = async (storyId: number): Promise<IStory> => {
  const story = await axios
    .get(`${storyUrl}${storyId}.json?print=pretty`)
    .then((response) => response.data)
    .catch((error) => console.log(`Error in getStoryInfo: ${error}`));
  return story;
};

export const getCommentInfo = async (commentId: number): Promise<IComment> => {
  const comment = await axios
    .get(`${commentUrl}${commentId}.json?print=pretty`)
    .then((response) => response.data)
    .catch((error) => console.log(`Error in getCommentInfo: ${error}`));
  return comment;
};
