import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar />
        <Switch>
          <Route component={() => <Redirect to='/posts' />} path='/' exact />
          <Route component={Home} path='/posts' exact />
          <Route component={Auth} path='/auth' exact />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
