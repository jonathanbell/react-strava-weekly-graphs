import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.css';

import Nav from './Nav';
import ActivitiesChart from './ActivitiesChart';
import Search from './Search';
import Footer from './Footer';

export default class App extends Component {
  state = {
    response: null
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div style={{ minHeight: '91vh' }}>
            <Header>
              <h1 className="sr-only">Strava Weekly Graphs</h1>
              <Nav />
              <a href="https://strava.com">
                <img
                  style={{
                    margin: 'auto',
                    maxWidth: '200px',
                    display: 'block'
                  }}
                  src="/api_logo_pwrdBy_strava_horiz_light.svg"
                  alt="Powered by Strava"
                />
              </a>
            </Header>
            <hr />
            <Switch>
              <Route exact path="/" component={ActivitiesChart} />
              <Route path="/weekly-graphs/:year" component={ActivitiesChart} />
              <Route path="/climbing-log" component={ActivitiesChart} />
              <Route path="/search" component={Search} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const Header = styled.header`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
`;
