import * as ActionTypes from '../../constants/actionTypes';
import reducer from './nodes';
import initialState from './initialState';


describe('Reducers::Nodes', () => {
  const getInitialState = () => {
    return initialState().movies;
  };

  const quotesArray = [
    {
      id: 1,
      type: "blocks",
      attributes: {
        index: 1,
        timestamp: 1530674152,
        data: "You",
        "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
        hash: "udfJLmh13UNAxG4F/1on07OMN1K1vCuaTYn9H2XGiX0="
      }
    },
    {
      id: 1,
      type: "blocks",
      attributes: {
        index: 1,
        timestamp: 1530674152,
        data: "You",
        "previous-hash": "KsmmdGrKVDr43/OYlM/oFzr7oh6wHG+uM9UpRyIoVe8=",
        hash: "udfJLmh13UNAxG4F/1on07OMN1K1vCuaTYn9H2XGiX0="
      }
    }
  ]

  const nodeA = {
    id: 'anchorman',
    online: false,
    title: null,
    quotes: Array
  };

  const nodeB = {
    id: 'moby-dick',
    online: false,
    title: null
  };

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_START', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_START, movie: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          loading: true
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodeA, res: {title: 'alpha'} };
    const expected = {
      list: [
        {
          ...nodeA,
          online: true,
          title: 'alpha',
          quotes: quotesArray,
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_FAILURE', () => {
    const appState = {
      list: [
        {
          ...nodeA,
          online: true,
          title: 'alpha',
          loading: false
        },
        nodeB
      ]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_FAILURE, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          online: false,
          title: 'alpha',
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });
});
