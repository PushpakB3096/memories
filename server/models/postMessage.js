import mongoose from "mongoose";

// defining a schema for how a post will look like
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  name: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// creating a model from the schema
var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
