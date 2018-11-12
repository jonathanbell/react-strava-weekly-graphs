import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.setDefaultYearNavValues = () => {
      const navYears = [];
      for (let i = new Date().getFullYear(); i >= 2013; i -= 1) {
        navYears.push(i);
      }
      return navYears;
    };
  }

  render() {
    return (
      <NavWrapper className="pt-2">
        <p>Select a year:</p>
        <ul>
          {this.setDefaultYearNavValues().map((year, index) => (
            <li key={year}>
              <Link to={`/weekly-graphs/${year}`}>{year}</Link>
            </li>
          ))}
        </ul>
        <ul
          style={{
            background: 'rgba(237, 237, 237, 0.9)',
            borderRadius: '2px',
            display: 'block'
          }}
        >
          <li style={{ paddingLeft: '0.25rem' }}>
            <Link to="/climbing-log">Climbing Log</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
      </NavWrapper>
    );
  }
}

export default Nav;

const NavWrapper = styled.nav`
  ul,
  li {
    list-style: none;
    padding: 0;
    padding-right: 0.5rem;
    margin: 0;
    display: inline;
  }

  p {
    margin-bottom: 0;
  }

  @media (min-width: 768px) {
    p {
      display: inline;
      padding-right: 0.25rem;
    }
  }
`;
