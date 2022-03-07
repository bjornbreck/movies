import * as ActionTypes from "../../constants/actionTypes";
import * as ActionCreators from "./nodes";
import mockFetch from "cross-fetch";

jest.mock("cross-fetch");

describe("Actions", () => {
  const dispatch = jest.fn();

  afterAll(() => {
    dispatch.mockClear();
    mockFetch.mockClear();
  });

  const movie = {
    id: "anchorman",
    online: false,
    title: 'anchorman',
  };

  it("should fetch the movie status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 200,
        json() {
          return Promise.resolve({ title: "Anchorman" });
        },
      })
    );
    await ActionCreators.checkNodeStatus(movie)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        movie,
        isLoading: true
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_SUCCESS,
        movie,
        isLoading: undefined,
        action: {resTitle: { title: 'title'}},
        res: { title: "Anchorman" }
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });

  it("should fail to fetch the movie status", async () => {
    mockFetch.mockReturnValueOnce(
      Promise.resolve({
        status: 400,
      })
    );
    await ActionCreators.checkNodeStatus(movie)(dispatch);
    const expected = [
      {
        type: ActionTypes.CHECK_NODE_STATUS_START,
        movie,
        isLoading: true
      },
      {
        type: ActionTypes.CHECK_NODE_STATUS_FAILURE,
        movie,
        isLoading: false
      },
    ];

    expect(dispatch.mock.calls.flat()).toEqual(expected);
  });
});
