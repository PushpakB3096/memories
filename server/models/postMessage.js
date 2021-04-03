import mongoose from "mongoose";

// defining a schema for how a post will look like
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  // the image will be converted to a base64 string
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// creating a model from the schema
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
