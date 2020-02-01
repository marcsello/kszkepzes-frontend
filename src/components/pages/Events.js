import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Container, Table, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getStaffEvents, deleteEvent } from '../../actions/statistics';
import AddEventForm from '../forms/AddEventForm';

class Events extends Component {
  UNSAFE_componentWillMount() {
    this.props.getStaffEvents();
  }

  renderEvents() {
    return this.props.events.map((event) => { 
      return (
        <Table.Row >
          <Table.Cell textAlign='center'>
            <Link to={`events/${event.id}`}>
              {event.name}
            </Link>
          </Table.Cell>
          <Table.Cell textAlign='center'>
            {moment(event.date).format('LL')}
          </Table.Cell>
          <Table.Cell textAlign='center'>
            {event.visitor_number}
          </Table.Cell>
          <Table.Cell textAlign='center'>
            <Button
              onClick={() => this.props.deleteEvent(event)}
              color='red'
              compact
              size='small'
            >
              Törlés
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <Container textAlign='center'>
        <div style={{overflowX: 'scroll'}}>
          <Table color='blue' unstackable celled selectable compact
          size='small'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'>Alkalom neve</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Dátum</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Jelen voltak</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.events ? this.renderEvents() : 'Nincs még alkalom beírva'}
            </Table.Body>
          </Table>
        </div>
        <br />
        <AddEventForm/>
      </Container>
    );
  }
}

const mapStateToProps = ({ events: { events }, user }) => ({ events, user });

export default connect(mapStateToProps, { getStaffEvents, deleteEvent })(Events);
