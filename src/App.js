/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import ActivitiesChart from './ActivitiesChart';
import Nav from './Nav';

const App = () => (
  <HashRouter>
    <div className="App">
      <header className="App-header">
        <Nav />
        <img
          style={{
            float: 'right',
            maxWidth: '200px'
          }}
          src="api_logo_pwrdBy_strava_horiz_light.svg"
          alt="Powered by Strava"
        />
      </header>
      <Switch>
        <Route path="/:year" component={ActivitiesChart} />
        <Route exact path="/" component={ActivitiesChart} />
      </Switch>
    </div>
  </HashRouter>
);

export default App;
