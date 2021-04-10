import axios from "axios";

// API is deployed on Heroku
// const BACKEND_URL = "https://pb-memories-api.herokuapp.com/posts";
const BACKEND_URL = "http://localhost:8080";

const API = axios.create({
  baseURL: BACKEND_URL,
});

// post related
export const fetchPosts = () => API.get("/posts");
export const createPost = (data) => API.post("/posts", data);
export const updatePost = (id, data) => API.patch(`/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

// user auth related
export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
