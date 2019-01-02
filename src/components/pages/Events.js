import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
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
        <Table.Cell>
          <Link to={`events/${event.id}`}>
            {event.name}
          </Link>
        </Table.Cell>
        <Table.Cell>{moment(event.date).format('LL')}</Table.Cell>
        <Table.Cell>111</Table.Cell>
      </Table.Row>
    );
    });
  }

  render() {
    return (
      <Container textAlign='center'>
        <Table color='blue' celled selectable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Alkalom neve</Table.HeaderCell>
              <Table.HeaderCell>Dátum</Table.HeaderCell>
              <Table.HeaderCell>Jelen voltak</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.events ? this.renderEvents() : 'Nincs még alaklom beírva'}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = ({ events: { events }, user }) => ({ events, user });

export default connect(mapStateToProps, { getEvents })(Events);
