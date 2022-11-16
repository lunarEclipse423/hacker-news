export enum NewsListActionTypes {
  UPDATE = "UPDATE",
  PUSH = "PUSH",
}

export interface NewsListAction {
  type: string;
  news: any[];
  newsItemInfo: any;
}

export interface NewsListState {
  news: any[];
  newsItemsInfo: any[];
}
