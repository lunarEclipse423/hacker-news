import { legacy_createStore as createStore } from "redux";
import allReducers from "./reducers";

const store = createStore(allReducers);
export type RootState = ReturnType<typeof store.getState>;

export default store;
