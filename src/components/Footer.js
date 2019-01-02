import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

const Footer = () => (
  <Segment inverted attached={'bottom'} vertical style={{clear: 'both'}} textAlign='center'>
    <Container>
      <p textalign='center'>Created by DevTeam &copy; 2017-2018.</p>
    </Container>
  </Segment>
);

export default Footer;
