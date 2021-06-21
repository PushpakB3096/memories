import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE_POST,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  CLEAR_POST,
  CLEAR_ALL_POSTS
} from "../constants/actionTypes";

const postReducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload
      };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case LIKE_POST:
    case UPDATE:
      // find the post which was just updated and return the updated post. For others, return the post as it is
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        )
      };
    case DELETE:
      // take everything but the post with ID we want to delete
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };
    case CLEAR_POST:
      // clear current post
      return {
        ...state,
        post: action.payload
      };
    case CLEAR_ALL_POSTS:
      // clear all posts
      return {
        ...state,
        post: action.payload
      };
    default:
      return state;
  }
};

export default postReducer;
