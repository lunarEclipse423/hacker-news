import { StoriesActionTypes } from "../../types/stories";
import { IStory } from "../../types/story";

export const updateStories = (updatedStories: number[]) => {
  return {
    type: StoriesActionTypes.UPDATE,
    storiesIds: updatedStories,
  };
};

export const addStory = (story: IStory) => {
  return {
    type: StoriesActionTypes.PUSH,
    storyInfo: story,
  };
};
