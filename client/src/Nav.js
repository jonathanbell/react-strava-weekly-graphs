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
      <NavWrapper>
        <ul>
          {this.setDefaultYearNavValues().map((year, index) => (
            <li key={year}>
              <Link to={`/weekly-graphs/${year}`}>{year}</Link>
            </li>
          ))}
        </ul>
      </NavWrapper>
    );
  }
}

export default Nav;

const NavWrapper = styled.nav`
  width: 50%;
  float: left;
  p {
    margin: 0;
  }
  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
    display: inline;
  }
  li {
    padding-right: 0.5rem;
  }
`;
