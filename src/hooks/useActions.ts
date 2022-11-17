import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as StoriesActionCreators from "../store/actions/storiesActions";

export const useStoriesActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(StoriesActionCreators, dispatch);
};
