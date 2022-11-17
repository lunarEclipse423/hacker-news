import { StoriesAction, StoriesState, StoriesActionTypes } from "../../types/stories";

const initState: StoriesState = {
  storiesIds: [],
  storiesInfo: [],
};

const storiesReducer = (state = initState, action: StoriesAction): StoriesState => {
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
