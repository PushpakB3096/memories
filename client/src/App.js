import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./components/Home/Home.js";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route component={Home} path="/" exact />
          {/* TODO: change the below route to render auth component */}
          <Route component={Home} path="/auth" exact />
        </Switch>
        <Home />
      </Container>
    </BrowserRouter>
  );
};

export default App;
