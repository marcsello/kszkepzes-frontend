import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import Home from "./pages/Home";
import Trainers from "./pages/Trainers";
import Schedule from "./pages/Schedule";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Statistics from "./pages/Statistics";
import Groups from "./pages/Groups";
import News from "./pages/News";
import Homework from "./pages/Homework";

const Main = () => (
  <Switch>
    <Redirect exact from="/" to="/home" />
    <Route exact path="/home" component={Home} />
    <Route path="/news" component={News} />
    <Route path="/trainers" component={Trainers} />
    <Route path="/schedule" component={Schedule} />
    <Route path="/profile" component={withRouter(Profile)} />
    <Route path="/statistics" component={Statistics} />
    <Route path="/groups" component={Groups} />
    <Route path="/homework" component={Homework} />
    <Route component={NotFound} />
  </Switch>
);

export default Main;
