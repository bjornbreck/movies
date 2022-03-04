import fetch from "cross-fetch";
import * as types from "../constants/actionTypes";

const checkNodeStatusStart = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node,
  };
};

const checkNodeStatusSuccess = (node, resTitle, resBlocks) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    resTitle,
    resBlocks,
  };
};

const checkNodeStatusFailure = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node,
  };
};

export function checkNodeStatus(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await fetch(`http://localhost:3001/api/${node.id}`);
      const res2 = await fetch(`http://localhost:3001/api/${node.id}/blocks`);
      // console.log('res => ', res.json());

      if (res.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
        return;
      }

      const jsonTitle = await res.json();
      const jsonBlocks = await res2.json();
      console.log('json2 => ', jsonBlocks);

      // dispatch(checkNodeStatusSuccess(node, json.blocks, json2));
      dispatch(checkNodeStatusSuccess(node, jsonTitle, jsonBlocks.blocks));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

export function checkNodeStatuses(list) {
  return (dispatch) => {
    list.forEach((node) => {
      dispatch(checkNodeStatus(node));
    });
  };
}
