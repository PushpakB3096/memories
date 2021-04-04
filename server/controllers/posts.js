import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

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
  const { title, message, selectedFile, creator, tags } = req.body;

  const newPostMessage = new PostMessage({
    title,
    message,
    selectedFile,
    creator,
    tags,
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// controller to update a post
export const updatePost = async (req, res) => {
  // obtain the ID of the post from the parameters
  // changing id to _id because mongodb stores it that way
  const { id: _id } = req.params;
  // obtaining the new post obj from the body of the request
  const post = req.body;

  // checking to see if the received ID is a valid ID as per mongodb
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No posts found with the ID of ${_id}`);

  // finding the post by ID and updating it
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      // this will send back the updated post
      new: true,
    }
  );

  res.json(updatedPost);
};

// controller to delete a post
export const deletePost = async (req, res) => {
  // obtain the ID of the post from the parameters
  // changing id to _id because mongodb stores it that way
  const { id: _id } = req.params;

  // checking to see if the received ID is a valid ID as per mongodb
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No posts found with the ID of ${_id}`);

  // finding the post by ID and deleting it
  await PostMessage.findByIdAndRemove(_id);

  res.json({
    message: `Post with ID ${_id} deleted successfully`,
  });
};

// controller to like a post
export const likePost = async (req, res) => {
  // obtain the ID of the post from the parameters
  // changing id to _id because mongodb stores it that way
  const { id: _id } = req.params;

  // checking to see if the received ID is a valid ID as per mongodb
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No posts found with the ID of ${_id}`);

  // finding the post by ID
  const post = await PostMessage.findById(_id);

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    {
      likeCount: post.likeCount + 1,
    },
    { new: true }
  );

  res.json(updatedPost);
};
