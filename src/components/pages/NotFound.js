import React, { Component } from "react";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <Segment inverted textAlign="center" vertical>
          <Container>
            <Header
              as="h1"
              content="404 - A keresett oldal nem található!"
              inverted
              style={{
                fontSize: "3em",
                fontWeight: "normal",
                marginBottom: 0,
                marginTop: "0.5em"
              }}
            />
            <Button
              href="/"
              primary
              size="huge"
              style={{
                fontSize: "2em",
                marginTop: "1em",
                marginBottom: "1em"
              }}
            >
              Vissza a Főoldalra
              <Icon name="right arrow" />
            </Button>
          </Container>
        </Segment>
      </div>
    );
  }
}
