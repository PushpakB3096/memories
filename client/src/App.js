import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import PostDetails from "./components/PostDetails/PostDetails.jsx";

const App = () => {
  // gets the current logged in user
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar />
        <Switch>
          <Route component={() => <Redirect to='/posts' />} path='/' exact />
          <Route component={Home} path='/posts' exact />
          <Route component={PostDetails} path='/posts/:id' exact />
          <Route
            component={() => {
              // the user shouldn't be allowed to go the authentication page if they are already logged in
              return user ? <Redirect to='/posts' /> : <Auth />;
            }}
            path='/auth'
            exact
          />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
