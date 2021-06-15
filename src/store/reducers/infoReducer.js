import { SET_TODOS } from "./ActionTypes";
import { getItem, setItem } from "../../utils/functions";

const INITIAL_STATE = {
  todos: getItem("todos") || [],
};
const clubReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TODOS: {
      setItem("todos", action.payload);
      return {
        ...state,
        todos: action.payload,
      };
    }
    default:
      return state;
  }
};

export default clubReducer;
