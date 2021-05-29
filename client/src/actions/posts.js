import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE_POST
} from "../constants/actionTypes";
import * as api from "../api/index.js";

// action to get all the posts
export const getPosts = page => async dispatch => {
  try {
    const { data, numberOfPages, currentPage } = await api.fetchPosts(page);

    // dispatch action that sets the posts received to the store
    dispatch({
      type: FETCH_ALL,
      payload: data
    });
  } catch (error) {
    console.error(error);
  }
};

// action to get the posts by a search term
export const getPostsBySearch = searchQuery => async dispatch => {
  try {
    const {
      data: { data }
    } = await api.fetchPostsBySearch(searchQuery);

    // dispatch the action with new data
    dispatch({
      type: FETCH_BY_SEARCH,
      payload: data
    });
  } catch (error) {
    console.error(error);
  }
};

// action to create a new post
export const createPost = post => async dispatch => {
  try {
    const response = await api.createPost(post);

    dispatch({
      type: CREATE,
      payload: response.data
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
