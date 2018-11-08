import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import ActivitiesChart from './ActivitiesChart';
import Nav from './Nav';

export default class App extends Component {
  state = {
    response: null
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <header>
            <Nav />
            <a href="https://strava.com">
              <img
                style={{
                  float: 'right',
                  maxWidth: '200px'
                }}
                src="/api_logo_pwrdBy_strava_horiz_light.svg"
                alt="Powered by Strava"
              />
            </a>
          </header>
          {/* <ActivitiesChart /> */}
          <Switch>
            <Route exact path="/" component={ActivitiesChart} />
            <Route path="/weekly-graphs/:year" component={ActivitiesChart} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
