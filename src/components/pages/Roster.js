import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FullRoster from './roster/FullRoster';
import Player from './roster/Player';

const Roster = () => (
  <Switch>
    <Route exact path='/roster' component={FullRoster} />
    <Route path='/roster/:number' component={Player} />
  </Switch>
);


export default Roster;
