import { IStory } from "./story";

export enum StoriesActionTypes {
  UPDATE = "UPDATE",
  PUSH = "PUSH",
}

export interface StoriesAction {
  type: string;
  storiesIds: number[];
  storyInfo: IStory;
}

export interface StoriesState {
  storiesIds: number[];
  storiesInfo: IStory[];
}
