import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Roster from './pages/Roster';
import Schedule from './pages/Schedule';
import NotFound from './pages/NotFound';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/roster' component={Roster} />
      <Route path='/schedule' component={Schedule} />
      <Route component={NotFound} />
    </Switch>
  </main>
);

export default Main;
