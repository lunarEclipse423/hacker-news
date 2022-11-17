import { IStoriesAction, IStoriesState, StoriesActionTypes } from "../../types/stories";

const initState: IStoriesState = {
  storiesIds: [],
  storiesInfo: [],
};

const storiesReducer = (state = initState, action: IStoriesAction): IStoriesState => {
  switch (action.type) {
    case StoriesActionTypes.UPDATE:
      return {
        storiesIds: action.storiesIds,
        storiesInfo: [],
      };
    case StoriesActionTypes.PUSH:
      return {
        ...state,
        storiesInfo: [...state.storiesInfo, action.storyInfo],
      };
    default:
      return state;
  }
};

export default storiesReducer;
