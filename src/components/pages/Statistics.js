import React, { Component } from "react";
import { Container, Header, Segment } from "semantic-ui-react";

export default class Statistics extends Component {
  render() {
    return (
      <div>
        <Segment inverted textAlign="center" vertical>
          <Container>
            <Header
              as="h1"
              content="Statisztikák - TODO"
              inverted
              style={{
                fontSize: "3em",
                fontWeight: "normal",
                marginBottom: 0,
                marginTop: "0.5em"
              }}
            />
          </Container>
        </Segment>
      </div>
    );
  }
}
