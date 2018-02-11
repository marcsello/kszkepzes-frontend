import React, { Component } from "react";
import {
  Container,
  Header,
  Segment,
  Grid,
  Image,
  Table,
  Icon
} from "semantic-ui-react";

export default class Homework extends Component {
  render() {
    return (
      <div>
        <Segment inverted textAlign="center" vertical>
          <Container>
            <Header
              as="h1"
              content="Házi feladatok"
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
        <Segment vertical>
          <Container>
            <Header
              as="h1"
              dividing
              content="Aktív feladatok"
              style={{
                fontSize: "3em",
                fontWeight: "normal",
                marginBottom: 0,
                marginTop: "0.5em"
              }}
            />
            <Table color="green">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Icon circular name="home" />Feladat megnevezése
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Icon circular name="calendar" />Beadási határidő
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Icon circular name="tasks" />Állapot
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    Protocols <Icon name="external" />
                  </Table.Cell>
                  <Table.Cell>2018. 03. 05. 23:59</Table.Cell>
                  <Table.Cell>
                    <Icon name="send" />Beadható
                  </Table.Cell>
                </Table.Row>
                <Table.Row warning>
                  <Table.Cell>
                    Networks <Icon name="external" />
                  </Table.Cell>
                  <Table.Cell>2018. 03. 01. 23:59</Table.Cell>
                  <Table.Cell>
                    <Icon name="wait" />Javításra vár
                  </Table.Cell>
                </Table.Row>
                <Table.Row negative>
                  <Table.Cell>
                    Security <Icon name="external" />
                  </Table.Cell>
                  <Table.Cell>2018. 02. 28. 23:59</Table.Cell>
                  <Table.Cell>
                    <Icon name="warning circle" />Nem elfogadható
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Header
              as="h1"
              dividing
              content="Lejárt határidejű feladatok"
              style={{
                fontSize: "3em",
                fontWeight: "normal",
                marginBottom: 0,
                marginTop: "2em"
              }}
            />
            <Table color="blue">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Icon circular name="home" />Feladat megnevezése
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Icon circular name="calendar" />Beadási határidő
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Icon circular name="tasks" />Állapot
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row warning>
                  <Table.Cell>
                    BASH <Icon name="external" />
                  </Table.Cell>
                  <Table.Cell>2018. 02. 30. 23:59</Table.Cell>
                  <Table.Cell>
                    <Icon name="warning circle" />Beadás elmaradt
                  </Table.Cell>
                </Table.Row>
                <Table.Row positive>
                  <Table.Cell>
                    Virtualbox <Icon name="external" />
                  </Table.Cell>
                  <Table.Cell>2018. 02. 25. 23:59</Table.Cell>
                  <Table.Cell>
                    <Icon name="checkmark" />Elfogadva
                  </Table.Cell>
                </Table.Row>
                <Table.Row positive>
                  <Table.Cell>
                    Selfie <Icon name="external" />
                  </Table.Cell>
                  <Table.Cell>2018. 02. 20. 23:59</Table.Cell>
                  <Table.Cell>
                    <Icon name="checkmark" />Elfogadva
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Container>
        </Segment>
      </div>
    );
  }
}
