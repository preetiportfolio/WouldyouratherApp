import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

export class NoMatch extends Component {
  render() {
    return (
      <Container textAlign="center">

        <Header as="h3">The Page Does not Exists </Header>
      </Container>
    );
  }
}

export default NoMatch;
