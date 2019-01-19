import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Container, Table, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getTrainees } from '../../actions/statistics';

class Applications extends Component {
  componentWillMount() {
    this.props.getTrainees();
  }

  renderApplicants() {
    return this.props.trainees.map((trainee) =>
    { return (
      <Table.Row>
        <Table.Cell>
          <Link to={`trainee/${trainee.id}`}>
            {trainee.full_name}
          </Link>
        </Table.Cell>
        <Table.Cell>
        </Table.Cell>
      </Table.Row>
    );
    });
  }

  render() {
    return (
      <Container
        textAlign='center'
        style={{
          padding: '80px'
        }}
      >
        <Table color='blue' celled selectable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Jelentkezettek</Table.HeaderCell>
              <Table.HeaderCell>Jelentkezés elfogadva:</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.trainees ? this.renderApplicants() : 'Nincs még alaklom beírva'}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = ({ trainees: { trainees }, user }) => ({ trainees, user });

export default connect(mapStateToProps, { getTrainees })(Applications);
