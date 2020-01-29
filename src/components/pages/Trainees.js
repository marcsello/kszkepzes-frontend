import React, { Component } from 'react';
import { Container, Table, Icon, Responsive } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getTrainees, getStaffEvents } from '../../actions/statistics';

class Trainees extends Component {
  componentWillMount() {
    this.props.getTrainees();
    this.props.getStaffEvents();
  }

  VisitedStatusNumber(trainee) {
    return (this.props.events.filter((event) => {
      return event.visitors.includes(trainee.id)
    })).length;
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
          <Icon color='red' name='cancel' />
        </Table.Cell>);
    }));
  }

  renderTraineesWithEvents() {
    return this.props.trainees.map((trainee) =>
    { return (
      <Table.Row>
        <Table.Cell textAlign='center'>
          {trainee.full_name}
        </Table.Cell>
        {this.renderVisitedStatus(trainee)}
      </Table.Row>
    );
    });
  }
  renderTraineesWithPoints() {
    return this.props.trainees.map((trainee) =>
    { return (
      <Table.Row textAlign='center'>
        <Table.Cell>
          {trainee.full_name}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          {`${this.VisitedStatusNumber(trainee)} / ${this.props.events.length}`}
        </Table.Cell>
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
        <Responsive minWidth={600} >
          <Table color='blue' unstackable celled selectable compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'>Képződők</Table.HeaderCell>
                { this.renderTableHeader() }
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.trainees ? this.renderTraineesWithEvents() : 'Nincsenek képződők'}
            </Table.Body>
          </Table>
        </Responsive>
        <Responsive maxWidth={599} >
          <Table color='blue' unstackable celled selectable compact>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'>Képződők</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>
                  Részvételi arány
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.trainees ? this.renderTraineesWithPoints() : 'Nincsenek képződők'}
            </Table.Body>
          </Table>
        </Responsive>
      </Container>
    );
  }
}

const mapStateToProps = ({ trainees: { trainees }, events: { events }, user }) => ({ trainees, events, user });

export default connect(mapStateToProps, { getTrainees, getStaffEvents })(Trainees);
