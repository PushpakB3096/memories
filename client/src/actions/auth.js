import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

// action to sign in the user
export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    // redirects the user back to home page
    history.push("/");
  } catch (error) {
    console.error(error);
  }
};

// action to register a new user
export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    // redirects the user back to home page
    history.push("/");
  } catch (error) {
    console.error(error);
  }
};
