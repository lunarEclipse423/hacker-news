import { IStory } from "./story";

export enum StoriesActionTypes {
  UPDATE = "UPDATE",
  PUSH = "PUSH",
}

export interface IStoriesAction {
  type: string;
  storiesIds: number[];
  storyInfo: IStory;
}

export interface IStoriesState {
  storiesIds: number[];
  storiesInfo: IStory[];
}
