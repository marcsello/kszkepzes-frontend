import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './pages/Home';
import Trainers from './pages/Trainers';
import Schedule from './pages/Schedule';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Statistics from './pages/Statistics';
import Circles from './pages/Circles';

const Main = () => (
  <Switch>
    <Redirect exact from='/' to='/home' />
    <Route exact path='/home' component={Home} />
    <Route path='/trainers' component={Trainers} />
    <Route path='/schedule' component={Schedule} />
    <Route path='/profile' component={withRouter(Profile)} />
    <Route path='/statistics' component={Statistics} />
    <Route path='/circles' component={Circles} />
    <Route component={NotFound} />
  </Switch>
);

export default Main;
