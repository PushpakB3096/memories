import React from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
  // getting all the posts from the store
  const { posts, isLoading } = useSelector(state => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return "No posts found...";

  // if the isLoading state is true, then show a circular progress bar. Otherwise show the grid of posts
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems='stretch'
      spacing={3}
    >
      {posts.map(post => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
