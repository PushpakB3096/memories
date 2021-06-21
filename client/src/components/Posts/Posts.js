import React from "react";
import { Grid, CircularProgress, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector(state => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return "No posts";

  return isLoading ? (
    <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size='7em' />
    </Paper>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems='stretch'
      spacing={3}
    >
      {posts?.map(post => (
        <Grid item xs={12} sm={12} md={6} lg={3}>
          <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
