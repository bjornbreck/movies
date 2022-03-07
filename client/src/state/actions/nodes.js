import fetch from "cross-fetch";
import * as types from "../../constants/actionTypes";

const checkNodeStatusStart = (movie, isLoading) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    movie,
    isLoading: isLoading
  };
};

const checkNodeStatusSuccess = (movie, resTitle, resBlocks, isLoading) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    movie,
    resTitle,
    resBlocks,
    isLoading: isLoading
  };
};

const checkNodeStatusFailure = (movie, isLoading) => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    movie,
    isLoading: isLoading
  };
};

export function checkNodeStatus(movie) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(movie, true));
      const res = await fetch(`http://localhost:3001/api/${movie.id}`);
      const res2 = await fetch(`http://localhost:3001/api/${movie.id}/blocks`);

      if (res.status >= 400) {
        dispatch(checkNodeStatusFailure(movie, false));
        return;
      }

      const jsonTitle = await res.json();
      const jsonBlocks = await res2.json();

      dispatch(checkNodeStatusSuccess(movie, jsonTitle, jsonBlocks.blocks, false));
    } catch (err) {
      dispatch(checkNodeStatusFailure(movie));
    }
  };
}

export function checkNodeStatuses(list) {
  return (dispatch) => {
    list.forEach((movie) => {
      dispatch(checkNodeStatus(movie));
    });
  };
}
