import React, { Component } from 'react';
import { Container, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getEvents } from '../../actions/statistics';

class Events extends Component {
  componentWillMount() {
    this.props.getEvents();
  }

  renderEvents() {
    return this.props.events.map((event) =>
    { return (
        <Table.Row>
          <Table.Cell>{event.name}</Table.Cell>
          <Table.Cell>{event.date}</Table.Cell>
        </Table.Row>
    );
    });
  }

  render() {
    return (
      <Container textAlign='center'>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Alkalom neve</Table.HeaderCell>
              <Table.HeaderCell>Dátum</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderEvents()}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = ({ events, user }) => ({ events, user });

export default connect(mapStateToProps, { getEvents })(Events);
