import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE_POST
} from "../constants/actionTypes";

const postReducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
    case FETCH_BY_SEARCH:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case LIKE_POST:
    case UPDATE:
      // find the post which was just updated and return the updated post. For others, return the post as it is
      return posts.map(post =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      // take everything but the post with ID we want to delete
      return posts.filter(post => post._id !== action.payload);
    default:
      return posts;
  }
};

export default postReducer;
