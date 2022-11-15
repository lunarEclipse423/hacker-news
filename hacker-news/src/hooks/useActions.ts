import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as NewsListActionCreators from "../store/actions/newsListActions";

export const useNewsListActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(NewsListActionCreators, dispatch);
};
