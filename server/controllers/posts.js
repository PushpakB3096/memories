import PostMessage from "../models/postMessage.js";

// controller to fetch all the posts
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// controller to create a new post
export const createPost = async (req, res) => {
  const newPost = req.body;
  const createdPost = new PostMessage(newPost);
  try {
    await createdPost.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
