import { NewsListActionTypes } from "../../types/newsList";

export const updateNewsList = (updatedList: any[]) => {
  return {
    type: NewsListActionTypes.UPDATE,
    news: updatedList,
  };
};
