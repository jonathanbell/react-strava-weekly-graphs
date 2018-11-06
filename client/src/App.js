import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import ActivitiesChart from './ActivitiesChart';
import Nav from './Nav';

export default class App extends Component {
  state = {
    response: ''
  };

  render() {
    return (
      <HashRouter>
        <div className="App">
          <header className="App-header">
            <p>this is the response! {this.state.response}</p>
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
          <ActivitiesChart />
          {/* <Switch>
            <Route path="/:year" component={ActivitiesChart} />
            <Route exact path="/" component={ActivitiesChart} />
          </Switch> */}
        </div>
      </HashRouter>
    );
  }
}
