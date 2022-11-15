import axios from "axios";

const baseUrl = "https://hacker-news.firebaseio.com/v0/";
const storiesIdsUrl = `${baseUrl}newstories.json?print=pretty`;
const storyUrl = `${baseUrl}item/`;
const newestStoriesMaxAmount = 100;

export const getNewsIds = async () => {
  const newestStoriesIds = await axios
    .get(storiesIdsUrl)
    .then((response) =>
      response.data.sort((a: number, b: number) => b - a).slice(0, newestStoriesMaxAmount)
    )
    .catch((error) => console.log(`Error in getNewsIds: ${error}`));
  return newestStoriesIds;
};

export const getNewsInfo = async (storyId: number) => {
  const story = await axios
    .get(`${storyUrl}${storyId}.json?print=pretty`)
    .then((response) => response.data)
    .catch((error) => console.log(`Error in getNewsInfo: ${error}`));
  return story;
};
