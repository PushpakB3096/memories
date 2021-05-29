import React, { useEffect, useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useHistory, useLocation } from "react-router-dom";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Paginate";

// related to redux
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();

  // if the 'page' query param doesn't exist, use page number as 1
  const page = query.get("page") || 1;
  // holds the search tags query
  const searchQuery = query.get("searchQuery");

  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  // refetch all the posts when the current ID changes
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  // this will search the memories for the query that the user entered
  const handleKeyPress = e => {
    /* 
      The 'Enter' key has the key code of 13.
      We can also use e.key === 'Enter'
    */
    if (e.keyCode === 13) {
      // TODO: search memory
    }
  };

  const handleAdd = newTag => setTags([...tags, newTag]);
  const handleDelete = tagToDelete =>
    setTags(tags.filter(tag => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          className={classes.gridContainer}
          container
          justify='space-between'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* kind of like a container to hold the search query */}
            <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
            >
              <TextField
                name='search'
                variant='outlined'
                label='Search memories'
                fullWidth
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                }}
                onKeyPress={handleKeyPress}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                label='Search by tags'
                variant='outlined'
                onAdd={handleAdd}
                onDelete={handleDelete}
              />
            </AppBar>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
            <Paper elevation={6}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
