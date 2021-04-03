import * as api from "../api/index.js";

// action to get all the posts
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

// action to create a new post
export const createPost = (post) => async (dispatch) => {
  try {
    const response = await api.createPost(post);

    dispatch({ type: "CREATE", payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};
