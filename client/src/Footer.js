import React from 'react';
import styled from 'styled-components';

import Biggies from './Biggies';

const Footer = () => (
  <FooterWrapper>
    <hr />
    <Biggies />
    <hr />
  </FooterWrapper>
);

const FooterWrapper = styled.footer`
  margin-bottom: -1rem;
  min-height: 20vh;
  margin-top: 2rem;
`;

export default Footer;
