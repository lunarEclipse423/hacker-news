import { IStory } from "./story";

export enum NewsListActionTypes {
  UPDATE = "UPDATE",
  PUSH = "PUSH",
}

export interface NewsListAction {
  type: string;
  news: number[];
  newsItemInfo: IStory;
}

export interface NewsListState {
  news: number[];
  newsItemsInfo: IStory[];
}
