import React, { Component } from 'react';
import { Container, Header, Item, Button, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getSelectedProfile, setStatus } from '../../actions/statistics';
import ConfirmModal from '../forms/ConfirmModal';

class ApplicantProfile extends Component {
  componentWillMount() {
    this.props.getSelectedProfile(this.props.match.params.id);
  }

  render() {
    const { id, signed, role, full_name, nick, motivation_about, motivation_exercise, motivation_profession }
    = this.props.selectedProfile;
    return (
      <Container style={{ padding: '60px' }}>
        <Item>
          <Item.Content>
            <Container textAlign='center'>
              <Header as='h2'>{full_name}</Header>
              <Item.Meta>{nick}</Item.Meta>
            </Container>
            <Item.Description>
              <Container textAlign='justified' style={{ padding: '30px' }}>
                <Header as='h3'>Magamról, eddigi tevékenységem:</Header>
                <p>{motivation_about}</p>
                <Header as='h3'>Szakmai motiváció:</Header>
                <p>{motivation_profession}</p>
                <Header as='h3'>Feladatok megoldása:</Header>
                <p>{motivation_exercise}</p>
              </Container>
              <Container textAlign='center' style={{ padding: '20px' }}>
                <Header as='h3'>Státusz:</Header>
                { signed ?
                  <div>
                    { role === 'Student' ?
                      <Label color='green' size='huge'>Elfogadva</Label>
                        :
                        null
                      }
                    { role === 'Staff' ?
                      <Label color='blue' size='huge'>Staff</Label>
                        :
                        null
                      }
                    { role === 'Applicant' ?
                      <Label color='orange' size='huge'>Jelentkezett</Label>
                        :
                        null
                      }
                    { role === 'Denied' ?
                      <Label color='red' size='huge'>Elutasítva</Label>
                        :
                        null
                      }
                  </div>
                  :
                  <Label color='red' size='huge'>Nem jelentkezett</Label>
                }
              </Container>
            </Item.Description>
          </Item.Content>
        </Item>
        { signed && role !== 'Staff' ?
          <Container textAlign='center'>
            <ConfirmModal
              button={
                <Button
                  color='green'
                >Jelentkezés elfogadása
                </Button>}
              text='elfogadod a jelentkezést'
              onAccept={() => this.props.setStatus(id, 'Student')}
            />
            <ConfirmModal
              button={
                <Button
                  color='red'
                >Jelentkezés elutasítása
                </Button>}
              text='elutasítod a jelentkezést'
              onAccept={() => this.props.setStatus(id, 'Denied')}
            />
          </Container>
          :
          null
        }
      </Container>
    );
  }
}

const mapStateToProps = ({ trainees: { selectedProfile } }) => ({ selectedProfile });

export default connect(mapStateToProps, { getSelectedProfile, setStatus })(ApplicantProfile);
