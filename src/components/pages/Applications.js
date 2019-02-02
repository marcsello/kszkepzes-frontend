import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Label, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getProfiles, setStatus } from '../../actions/statistics';
import ConfirmModal from '../forms/ConfirmModal';

class Applications extends Component {
  componentWillMount() {
    this.props.getProfiles();
  }

  renderApplicants() {
    return this.props.profiles.map((profile) =>
    { return (
      <Table.Row>
        <Table.Cell>
          <Link to={`applicant/${profile.id}`}>
            {profile.full_name}
          </Link>
        </Table.Cell>
        { profile.signed ?
          <Table.Cell textAlign='center'>
            { profile.role === 'Student' ?
              <Label color='green'>Elfogadva</Label>
              :
              null
            }
            { profile.role === 'Staff' ?
              <Label color='blue'>Staff</Label>
              :
              null
            }
            { profile.role === 'Applicant' ?
              <Label color='orange'>Jelentkezett</Label>
              :
              null
            }
            { profile.role === 'Denied' ?
              <Label color='red'>Elutasítva</Label>
              :
              null
            }
          </Table.Cell>
          :
          <Table.Cell textAlign='center'>
            { profile.role === 'Staff' ?
              <Label color='blue'>Staff</Label>
              :
              <Label color='red'>Nem jelentkezett</Label>
            }
          </Table.Cell>
        }
        <Table.Cell>
          { profile.role !== 'Staff' ?
            <ConfirmModal
              button={<Button
                color='blue'
                size='tiny'
              >
              Staff jog adás
            </Button>}
            text='staff jogot adsz neki'
            onAccept={() => this.props.setStatus(profile.id, 'Staff')}
            />
          :
          null }
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
              <Table.HeaderCell textAlign='center'>Jelentkezés státusza:</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderApplicants()}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = ({ trainees: { profiles }, user }) => ({ profiles, user });

export default connect(mapStateToProps, { getProfiles, setStatus })(Applications);
