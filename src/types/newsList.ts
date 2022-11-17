import { IStory } from "./story";

export enum NewsListActionTypes {
  UPDATE = "UPDATE",
  PUSH = "PUSH",
}

export interface NewsListAction {
  type: string;
  storiesIds: number[];
  newsItemInfo: IStory;
}

export interface NewsListState {
  storiesIds: number[];
  newsItemsInfo: IStory[];
}
