import axios from "axios";

const BACKEND_URL = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(BACKEND_URL);
export const createPost = (data) => axios.post(BACKEND_URL, data);
export const updatePost = (id, data) =>
  axios.patch(`${BACKEND_URL}/${id}`, data);
export const deletePost = (id) => axios.delete(`${BACKEND_URL}/${id}`);
export const likePost = (id) => axios.patch(`${BACKEND_URL}/${id}/likePost`);