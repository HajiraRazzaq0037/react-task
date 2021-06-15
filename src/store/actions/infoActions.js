import * as actionTypes from "../reducers/ActionTypes";

export const Todos = (info) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_TODOS, payload: info });
};
