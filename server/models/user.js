import mongoose from "mongoose";

// defining a schema for how a user will look like
const userSchema = mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model("User", userSchema);
