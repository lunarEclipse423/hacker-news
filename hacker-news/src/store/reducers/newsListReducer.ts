import { NewsListAction, NewsListActionTypes } from "../../types/newsList";

const initState: any[] = [];

const newsListReducer = (state = initState, action: NewsListAction): any => {
  switch (action.type) {
    case NewsListActionTypes.UPDATE:
      return action.news;
    default:
      return state;
  }
};

export default newsListReducer;
