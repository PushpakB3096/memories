import axios from "axios";

const BACKEND_URL = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(BACKEND_URL);
