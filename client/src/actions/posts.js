import {
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE_POST,
  START_LOADING,
  END_LOADING
} from "../constants/actionTypes";
import * as api from "../api/index.js";

// action to get a post based on ID
export const getPost = id => async dispatch => {
  try {
    // set loading to true
    dispatch({
      type: START_LOADING
    });

    const { data } = await api.fetchPost(id);

    // dispatch action that sets the posts received to the store
    dispatch({
      type: FETCH_POST,
      payload: data
    });

    // set loading to false after data is fetched
    dispatch({
      type: END_LOADING
    });
  } catch (error) {
    console.error(error);
  }
};

// action to get all the posts
export const getPosts = page => async dispatch => {
  try {
    // set loading to true
    dispatch({
      type: START_LOADING
    });

    const { data } = await api.fetchPosts(page);

    // dispatch action that sets the posts received to the store
    dispatch({
      type: FETCH_ALL,
      payload: data
    });

    // set loading to false after data is fetched
    dispatch({
      type: END_LOADING
    });
  } catch (error) {
    console.error(error);
  }
};

// action to get the posts by a search term
export const getPostsBySearch = searchQuery => async dispatch => {
  try {
    // set loading to true
    dispatch({
      type: START_LOADING
    });

    const {
      data: { data }
    } = await api.fetchPostsBySearch(searchQuery);

    // dispatch the action with new data
    dispatch({
      type: FETCH_BY_SEARCH,
      payload: data
    });

    // set loading to false after data is fetched
    dispatch({
      type: END_LOADING
    });
  } catch (error) {
    console.error(error);
  }
};

// action to create a new post
export const createPost = (post, history) => async dispatch => {
  try {
    // set loading to true
    dispatch({
      type: START_LOADING
    });

    const { data } = await api.createPost(post);

    // navigate to the newly created post
    history.push(`/posts/${data._id}`);

    dispatch({
      type: CREATE,
      payload: data
    });

    // set loading to false after data is fetched
    dispatch({
      type: END_LOADING
    });
  } catch (error) {
    console.error(error);
  }
};

// action to update a post
export const updatePost = (id, post) => async dispatch => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({
      type: UPDATE,
      payload: data
    });
  } catch (error) {
    console.error(error);
  }
};

// action to delete a post
export const deletePost = id => async dispatch => {
  try {
    await api.deletePost(id);
    dispatch({
      type: DELETE,
      payload: id
    });
  } catch (error) {
    console.error(error);
  }
};

// action to like a post
export const likePost = id => async dispatch => {
  try {
    const { data } = await api.likePost(id);
    dispatch({
      type: LIKE_POST,
      payload: data
    });
  } catch (error) {
    console.error(error);
  }
};
