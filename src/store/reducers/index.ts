import { combineReducers } from "redux";
import storiesReducer from "./storiesReducer";

const allReducers = combineReducers({
  stories: storiesReducer,
});

export default allReducers;
