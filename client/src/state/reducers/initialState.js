const initialState = () => ({
  /*
  * todo shouldn't this be an object of type node -> list -> array -> movie object {id, online, title, loading}?
   * then the server/data/movies would fill this all in on response?
  * */
  nodes: {
    list: [
      {
        id: "taxi-driver",
        online: false,
        title: "Node 1",
        loading: false,
      },
      {
        id: "anchorman",
        online: false,
        title: "Node 2",
        loading: false,
      },
      {
        id: "moby-dick",
        online: false,
        title: "Node 3",
        loading: false,
      },
      {
        id: "kill-bill-vol-3",
        online: false,
        title: "Node 4",
        loading: false,
      },
    ],
  },
});
export default initialState;
