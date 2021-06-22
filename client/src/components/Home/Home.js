import React, { useState } from "react";
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
import { getPostsBySearch } from "../../actions/posts";

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

  // this will search the memories for the query that the user entered
  const handleKeyPress = e => {
    /* 
      The 'Enter' key has the key code of 13.
      We can also use e.key === 'Enter'
    */
    if (e.keyCode === 13) {
      searchPosts();
    }
  };

  const handleAdd = newTag => setTags([...tags, newTag]);
  const handleDelete = tagToDelete =>
    setTags(tags.filter(tag => tag !== tagToDelete));

  // function that will trigger a search of the memories
  const searchPosts = () => {
    // only search when the search box is not empty or when there are tags
    if (search.trim() || tags.length) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      // for client side routing
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      // if the search term is empty or there are no tags and the user clicks on the button, redirect user to the home page
      history.push("/");
    }
  };

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
                autoComplete='off'
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
                // when user presses enter after typing a tag name
                onAdd={handleAdd}
                // when user clicks on cross mark to remove a particular tag
                onDelete={handleDelete}
              />
              <Button color='primary' variant='contained'>
                Search
              </Button>
            </AppBar>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
            <Paper elevation={6} className={classes.pagination}>
              <Paginate page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
