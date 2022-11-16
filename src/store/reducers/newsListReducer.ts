import { NewsListAction, NewsListState, NewsListActionTypes } from "../../types/newsList";

const initState: NewsListState = {
  news: [],
  newsItemsInfo: [],
};

const newsListReducer = (state = initState, action: NewsListAction): any => {
  switch (action.type) {
    case NewsListActionTypes.UPDATE:
      return {
        news: action.news,
        newsItemsInfo: [],
      };
    case NewsListActionTypes.PUSH:
      return {
        ...state,
        newsItemsInfo: [...state.newsItemsInfo, action.newsItemInfo],
      };
    default:
      return state;
  }
};

export default newsListReducer;
