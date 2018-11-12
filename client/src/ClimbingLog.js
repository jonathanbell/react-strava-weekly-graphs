import React, { Component } from 'react';
import styled from 'styled-components';

export default class ClimbingLog extends Component {
  state = {
    recentRockClimbs: []
  };

  async componentDidMount() {
    const response = await fetch(
      `/api/weekly-graphs/${new Date().getFullYear()}`
    ).catch(error => {
      console.error(error);
    });

    const activities = await response.json();

    if (response.status !== 200) {
      throw new Error(`HTTP response code error: ${response.status}`);
    }

    const rockClimbs = activities.filter(a => a.label === 'Rock Climbing');
    const yearsRockClimbs = rockClimbs[0].data;

    const now = new Date();
    const onejan = new Date(now.getFullYear(), 0, 1);
    let week = Math.ceil(((now - onejan) / 86400000 + onejan.getDay() + 1) / 7);
    week = week === 0 ? 1 : week;

    const weekRange = week <= 3 ? 0 : 3;

    const recentRockClimbs = yearsRockClimbs.slice(week - weekRange, week);
    recentRockClimbs.reverse();

    this.setState({ recentRockClimbs });
  }

  render() {
    return (
      <ClimbingLogWrapper>
        <h1>Climbing Log</h1>
        <hr />
        {this.state.recentRockClimbs[0] && (
          <p>Current Week: {this.state.recentRockClimbs[0].toFixed(2)}</p>
        )}
        {this.state.recentRockClimbs[1] && (
          <p>Previous Week: {this.state.recentRockClimbs[1].toFixed(2)}</p>
        )}
        {this.state.recentRockClimbs[2] && (
          <p>Week before that: {this.state.recentRockClimbs[2].toFixed(2)}</p>
        )}
      </ClimbingLogWrapper>
    );
  }
}

const ClimbingLogWrapper = styled.div`
  p {
    font-size: 2rem;
    margin: 2rem 0;
  }
`;
