// importing dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// allow CORS
app.use(cors());

// constants go here
const CONNECTION_URL =
  "mongodb+srv://pushpak-memories:pass123@cluster0.keakc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

// all routes go here
import postRoutes from "./routes/posts.js";

// registering routes
app.use("/posts", postRoutes);

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

// connect to mongoose
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => console.error(error.message));

mongoose.set("useFindAndModify", false);
