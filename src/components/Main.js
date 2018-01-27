import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Trainers from "./pages/Trainers";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";

const Main = () => (
  <main>
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route exact path="/home" component={Home} />
      <Route path="/trainers" component={Trainers} />
      <Route path="/schedule" component={Schedule} />
      <Route component={NotFound} />
    </Switch>
  </main>
);

export default Main;
