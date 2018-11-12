import React, { Component } from 'react';
import styled from 'styled-components';

import Activity from './Activity';

export default class Search extends Component {
  state = {
    searchTerm: '',
    isError: false,
    activities: []
  };

  getSearchResults = async () => {
    this.setState({ isError: false });

    const response = await fetch(
      `/api/search?s=${this.state.searchTerm}`
    ).catch(error => {
      this.setState({ isError: true });
      console.error(error);
    });

    const activities = await response.json();

    if (response.status !== 200) {
      throw new Error(`HTTP response code error: ${response.status}`);
    }

    this.setState({ activities });
    console.log('activities', this.state.activities);
  };

  clearSearchValue = event => {
    this.setState({ searchTerm: '', activities: [] });
  };

  handleInputChange = async event => {
    this.setState({ searchTerm: event.target.value }, () => {
      if (this.state.searchTerm.length > 2) {
        this.getSearchResults();
      }
    });
  };

  render() {
    return (
      <div>
        <SearchWrapper>
          <h2>Search for an activity</h2>
          <input
            type="text"
            placeholder="Start typing..."
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
          />
          <button onClick={this.clearSearchValue}>Clear</button>
          {this.state.isError && (
            <p className="mt-2 text-danger">
              There was an error while searching for activities. There may be
              more information available in the JavaScript console.
            </p>
          )}
        </SearchWrapper>
        <SearchResults className="mt-3">
          {this.state.activities.length === 0 &&
            !this.state.isError &&
            this.state.searchTerm.length > 2 && (
              <p className="mt-2 text-info">
                No results found for: <mark>{this.state.searchTerm}</mark>
              </p>
            )}
          {this.state.activities.map(activity => (
            <Activity key={activity.id} activity={activity} />
          ))}
        </SearchResults>
      </div>
    );
  }
}

const SearchWrapper = styled.div`
  input {
    max-width: 500px;
    width: 100%;
    padding: 3px;
  }
  button {
    padding: 3px;
  }
`;

const SearchResults = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
  }
`;
