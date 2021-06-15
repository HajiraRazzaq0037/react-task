import { combineReducers } from "redux";
import todos from "./infoReducer";
export const Reducers = combineReducers({
  todos: todos,
});
