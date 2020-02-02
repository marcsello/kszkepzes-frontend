import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Home from './pages/Home';
import Mentors from './pages/Mentors';
import Schedule from './pages/Schedule';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Statistics from './pages/Statistics';
import Groups from './pages/Groups';
import News from './pages/News';
import Homework from './pages/Homework';
import Applications from './pages/Applications';
import EventDetail from './pages/EventDetail';
import ApplicantProfile from './pages/ApplicantProfile';

const Main = () => (
  <Switch>
    <Redirect exact from='/' to='/home' />
    <Route exact path='/home' component={Home} />
    <Route path='/news' component={News} />
    <Route path='/mentors' component={Mentors} />
    <Route path='/schedule' component={Schedule} />
    <Route path='/profile' component={withRouter(Profile)} />
    <Route path='/statistics' component={Statistics} />
    <Route path='/groups' component={Groups} />
    <Route path='/homework' component={Homework} />
    <Route path='/events/:id' component={EventDetail} />
    <Route path='/applications' component={Applications} />
    <Route path='/applicant/:id' component={ApplicantProfile} />
    <Route component={NotFound} />
  </Switch>
);

export default Main;
