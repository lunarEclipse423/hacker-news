import { NewsListActionTypes } from "../../types/newsList";
import { IStory } from "../../types/story";

export const updateNewsList = (updatedList: number[]) => {
  return {
    type: NewsListActionTypes.UPDATE,
    storiesIds: updatedList,
  };
};

export const addNewsItem = (newsItem: IStory) => {
  return {
    type: NewsListActionTypes.PUSH,
    newsItemInfo: newsItem,
  };
};
