// importing dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// all routes go here
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

// constants go here
const PORT = process.env.PORT || 8080;

// since we are sending images in the request body, only allow 30mb of file size
app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true
  })
);
// allow CORS
app.use(cors());

// registering routes
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

// add greetings for deployed API. this is just for testing whether our API works after deployment
app.get("/", (req, res) => {
  res.send("Welcome to Memories API by Pushpak Bhattacharya");
});

// connect to mongo atlas instance
mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(error => console.error(error.message));

mongoose.set("useFindAndModify", false);
