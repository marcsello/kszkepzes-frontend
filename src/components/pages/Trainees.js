import React, { Component } from 'react';
import { Container, Table, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getTrainees, getStaffEvents } from '../../actions/statistics';

class Trainees extends Component {
  componentWillMount() {
    this.props.getTrainees();
    this.props.getStaffEvents();
  }

  renderVisitedStatus(trainee) {
    return (this.props.events.map((event) => {
      if (event.visitors.includes(trainee.id)) {
        return (
          <Table.Cell textAlign='center'>
            <Icon color='green' name='checkmark' />
          </Table.Cell>);
      }
      return (
        <Table.Cell textAlign='center'>
          { event.absent.includes(trainee.id) ?
            <Icon color='orange' name='minus' />
            :
            <Icon color='red' name='cancel' />
          }
        </Table.Cell>);
    }));
  }

  renderTrainees() {
    return this.props.trainees.map((trainee) =>
    { return (
      <Table.Row>
        <Table.Cell>
          {trainee.full_name}
        </Table.Cell>
        {this.renderVisitedStatus(trainee)}
      </Table.Row>
    );
    });
  }

  renderTableHeader() {
    return (this.props.events.map(event => (
      <Table.HeaderCell textAlign='center'>
        {event.name}
      </Table.HeaderCell>)));
  }

  render() {
    return (
      <Container textAlign='center'>
        <Table color='blue' selectable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Képződők</Table.HeaderCell>
              { this.renderTableHeader() }
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.trainees ? this.renderTrainees() : 'Nincsenek képződők'}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = ({ trainees: { trainees }, events: { events }, user }) => ({ trainees, events, user });

export default connect(mapStateToProps, { getTrainees, getStaffEvents })(Trainees);
