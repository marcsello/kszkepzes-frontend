import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getTrainees } from '../../actions/statistics';

class Trainees extends Component {
  componentWillMount() {
    this.props.getTrainees();
  }

  renderTrainees() {
    return this.props.trainees.map((trainee) =>
    { return (
      <Table.Row>
        <Table.Cell>
          <Link to={`trainees/${trainee.id}`}>
            {trainee.full_name}
          </Link>
        </Table.Cell>
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
              <Table.HeaderCell>Képződők</Table.HeaderCell>
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

const mapStateToProps = ({ trainees: { trainees }, user }) => ({ trainees, user });

export default connect(mapStateToProps, { getTrainees })(Trainees);
