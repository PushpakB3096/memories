// importing dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// all routes go here
import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

// constants go here
const PORT = process.env.PORT || 5000;

// only allow 30mb of file size for images
app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);
// allow CORS
app.use(cors());

// registering routes
app.use("/posts", postRoutes);

// connect to mongoose
mongoose
  .connect(process.env.CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => console.error(error.message));

mongoose.set("useFindAndModify", false);
