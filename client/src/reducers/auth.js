import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      // save user info in local storage
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      // removes user info from local storage
      localStorage.removeItem("profile");
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
