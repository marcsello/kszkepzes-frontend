import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getStaffEvents, deleteEvent, selectEventForEdit } from '../../actions/statistics';
import AddEventForm from '../forms/AddEventForm';
import EditEventForm from '../forms/EditEventForm';
import ConfirmModal from '../forms/ConfirmModal';

class Events extends Component {
  UNSAFE_componentWillMount() {
    this.props.getStaffEvents();
  }

  renderEvents() {
<<<<<<< HEAD
    return this.props.events.map((event) =>
    { return (
      <Table.Row>
        <Table.Cell>
          <Link to={`events/${event.id}`}>
            {event.name}
          </Link>
        </Table.Cell>
        <Table.Cell>{moment(event.date).format('LL')}</Table.Cell>
        <Table.Cell>{event.visitor_number}</Table.Cell>
        <Table.Cell textAlign='center'>
          <EditEventForm onClick={() => this.props.selectEventForEdit(event)} />
          <ConfirmModal
            text={`törölni akarod a következő alkalmat:${event.name}`}
            button={
              <Button
                inverted
                color='red'
              >
                <Icon name='x' />
                Törlés
              </Button>
               }
            onAccept={() => this.props.deleteEvent(event)}
          />
        </Table.Cell>
      </Table.Row>
    );
=======
    return this.props.events.map((event) => { 
      return (
        <Table.Row key={event.id}>
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
>>>>>>> dev
    });
  }

  render() {
    return (
      <Container textAlign='center'>
<<<<<<< HEAD
        <Table color='blue' selectable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Alkalom neve</Table.HeaderCell>
              <Table.HeaderCell>Dátum</Table.HeaderCell>
              <Table.HeaderCell>Jelen voltak</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.events ? this.renderEvents() : 'Nincs még alaklom beírva'}
          </Table.Body>
        </Table>
        <AddEventForm />
=======
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
>>>>>>> dev
      </Container>
    );
  }
}

const mapStateToProps = ({ events: { events }, user }) => ({ events, user });

export default connect(mapStateToProps, { getStaffEvents, selectEventForEdit, deleteEvent })(Events);
