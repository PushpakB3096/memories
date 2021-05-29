import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE_POST
} from "../constants/actionTypes";

const postReducer = (state = [], action) => {
  switch (action.type) {
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
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case LIKE_POST:
    case UPDATE:
      // find the post which was just updated and return the updated post. For others, return the post as it is
      return state.map(post =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      // take everything but the post with ID we want to delete
      return state.filter(post => post._id !== action.payload);
    default:
      return state;
  }
};

export default postReducer;
