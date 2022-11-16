export enum NewsListActionTypes {
  UPDATE = "UPDATE",
}

export interface NewsListAction {
  type: string;
  news: any[];
}
