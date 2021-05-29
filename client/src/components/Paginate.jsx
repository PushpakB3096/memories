import React from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";

import useStyles from "./paginateStyles";

const Paginate = () => {
  const classes = useStyles();
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      // TODO: make count and page dynamic
      count={5}
      page={1}
      variant='outlined'
      color='primary'
      renderItem={item => (
        // TODO: make the page number dynamic
        <PaginationItem {...item} component={Link} to={`/posts/pages=${1}`} />
      )}
    />
  );
};

export default Paginate;
