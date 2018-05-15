import React, { Component } from 'react';
import moment from 'moment';
import styled from 'styled-components';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.setDefaultYearNavValues = () => {
      const navYears = [];
      for (let i = moment().year(); i >= moment().year() - 2; i -= 1) {
        navYears.push(i);
      }
      return navYears;
    };
  }

  render() {
    return (
      <NavWrapper>
        <p>Select a year:</p>
        <ul>
          {this.setDefaultYearNavValues().map(year => (
            <li key={year}>
              <a href={`/${year}`}>{year}</a>
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
