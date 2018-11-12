import React, { Component } from 'react';
import styled from 'styled-components';

import Activity from './Activity';

export default class Biggies extends Component {
  state = {
    biggies: []
  };

  async componentDidMount() {
    const response = await fetch(`/api/biggies`).catch(error => {
      console.error(error);
    });

    const biggies = await response.json();

    if (response.status !== 200) {
      throw new Error(`HTTP response code error: ${response.status}`);
    }

    this.setState({ biggies });
  }

  render() {
    return (
      <BiggiesWrapper>
        <h1 className="h2">Biggest Activities</h1>
        {this.state.biggies[0] && (
          <section>
            <h2 className="h4 mt-2">Most Elevation Gain</h2>
            <Activity activity={this.state.biggies[0]} />
          </section>
        )}
        {this.state.biggies[1] && (
          <section>
            <h2 className="h4 mt-2">Longest Duration</h2>
            <Activity activity={this.state.biggies[1]} />
          </section>
        )}
        {this.state.biggies[2] && (
          <section>
            <h2 className="h4 mt-2">Longest Distance</h2>
            <Activity activity={this.state.biggies[2]} />
          </section>
        )}
        {this.state.biggies[3] && (
          <section>
            <h2 className="h4 mt-2">Fastest (max speed)</h2>
            <Activity activity={this.state.biggies[3]} />
          </section>
        )}
      </BiggiesWrapper>
    );
  }
}

const BiggiesWrapper = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
  }

  h1 {
    grid-column: 1 / -1;
  }
`;
