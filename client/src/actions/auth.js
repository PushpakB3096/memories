import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

// action to sign in the user
export const signin = (formData, history) => async (dispatch) => {
  try {
    // TODO: log in the user

    // redirects the user back to home page
    history.push("/");
  } catch (error) {
    console.error(error);
  }
};

// action to register a new user
export const signup = (formData, history) => async (dispatch) => {
  try {
    // TODO: registers a new user

    // redirects the user back to home page
    history.push("/");
  } catch (error) {
    console.error(error);
  }
};
