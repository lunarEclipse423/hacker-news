import { NewsListAction, NewsListState, NewsListActionTypes } from "../../types/newsList";

const initState: NewsListState = {
  storiesIds: [],
  newsItemsInfo: [],
};

const newsListReducer = (state = initState, action: NewsListAction): NewsListState => {
  switch (action.type) {
    case NewsListActionTypes.UPDATE:
      return {
        storiesIds: action.storiesIds,
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
