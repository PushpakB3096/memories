import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";

import { getPosts } from "../actions/posts";

import useStyles from "./paginateStyles";

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector(state => state.posts);

  // refetch posts when the page
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      // TODO: make count and page dynamic
      count={numberOfPages}
      page={parseInt(page) || 1}
      variant='outlined'
      color='primary'
      renderItem={item => (
        // TODO: make the page number dynamic
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
