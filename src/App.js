/* eslint react/no-did-mount-set-state: 0 */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import ActivitiesChart from './ActivitiesChart';
import Nav from './Nav';

const App = () => (
  <Router>
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
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/`}
          component={ActivitiesChart}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/:year`}
          component={ActivitiesChart}
        />
      </Switch>
    </div>
  </Router>
);

export default App;
