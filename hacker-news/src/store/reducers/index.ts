import { combineReducers } from "redux";
import newsListReducer from "./newsListReducer";

const allReducers = combineReducers({
  newsList: newsListReducer,
});

export default allReducers;
