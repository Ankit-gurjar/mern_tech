/* eslint-disable */
import React from 'react';
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/About">
          <About />
        </Route>

        <Route path="/Contact">
          <Contact />
        </Route>

        <Route path="/Login">
          <Login />
        </Route>

        <Route path="/Signup">
          <Signup />
        </Route>
      </Switch>
    </>
  );
}

export default App;
