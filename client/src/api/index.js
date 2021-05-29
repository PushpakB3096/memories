import axios from "axios";

// API is deployed on Heroku
const BACKEND_URL = "https://pb-memories-api.herokuapp.com/";
// uncomment the below line for dev work
// const BACKEND_URL = "http://localhost:8080/";

const API = axios.create({
  baseURL: BACKEND_URL
});

// adding interceptor that will add the token in the auth header for each request
API.interceptors.request.use(req => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const token = profile?.token;

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// post related
export const fetchPosts = page => API.get(`/posts?page=${page}`);
export const fetchPost = id => API.get(`/posts/${id}`);
export const fetchPostsBySearch = searchQuery =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = data => API.post("/posts", data);
export const updatePost = (id, data) => API.patch(`/posts/${id}`, data);
export const deletePost = id => API.delete(`/posts/${id}`);
export const likePost = id => API.patch(`/posts/${id}/likePost`);

// user auth related
export const signIn = formData => API.post("/users/signin", formData);
export const signUp = formData => API.post("/users/signup", formData);
