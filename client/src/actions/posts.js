import * as api from "../api";

// action creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    // dispatch action that sets the posts received to the store
    dispatch({
      type: "FETCH_ALL",
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};
