import React from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";

import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("profile"));

  // sub-component to show and properly format the number of users who like it
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        like => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          <Typography variant='caption'>
            {post.likes.length > 2
              ? `You and ${post.likes.length - 1} others`
              : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
          </Typography>
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;
          <Typography variant='caption'>
            {post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
          </Typography>
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component='span'
        name='test'
        className={classes.cardAction}
        onClick={openPost}
      >
        {/* memory image goes here */}
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant='h6'>
            {/* hide the overflow of name with ellipses */}
            {post.name.length > 15 ? `${post.name.slice(0, 15)}...` : post.name}
          </Typography>
          {/* displays relative time eg. 5 hours ago */}
          <Typography variant='caption'>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {/* for edit icon */}
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className={classes.overlay2} name='edit'>
            {/* this button will display more actions */}
            <Button
              style={{ color: "white" }}
              size='small'
              onClick={e => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize='default' />
            </Button>
          </div>
        )}
        {/* div to show tags */}
        <div className={classes.details}>
          <Typography variant='caption' color='textSecondary'>
            {post.tags.map(tag => `#${tag} `)}
          </Typography>
        </div>
        {/* for displaying the post title */}
        <Typography className={classes.title} variant='h6' gutterBottom>
          {post.title}
        </Typography>
        {/* this will display the message */}
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      {/* shows the like and delete button */}
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          // if the user is not logged in then button is disabled
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size='small'
            color='primary'
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize='small' /> &nbsp;{" "}
            <Typography variant='caption'>Delete</Typography>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
