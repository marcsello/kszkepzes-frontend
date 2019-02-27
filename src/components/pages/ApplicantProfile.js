import React, { Component } from 'react';
import {
  Container,
  Header,
  Item,
  Button,
  Label,
  List,
  Form,
  Comment,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getSelectedProfile, setStatus } from '../../actions/statistics';
import { getNotesByProfile, writeNote, clearWrite, postNote, deleteNote } from '../../actions/notes';
import ConfirmModal from '../forms/ConfirmModal';

import moment from 'moment';

const options = [
  { key: 'DT', text: 'DevTeam' },
  { key: 'NET', text: 'NETeam' },
  { key: 'ST', text: 'SecurITeam' },
  { key: 'SYS', text: 'SysAdmin' },
  { key: 'HAT', text: 'Hallgatói Tudásbázis' },
];

class ApplicantProfile extends Component {
  componentWillMount() {
    this.props.getSelectedProfile(this.props.match.params.id);
    this.props.getNotesByProfile(this.props.match.params.id);
  }

  renderGroups() {
    const { groups } = this.props.selectedProfile;
    const groupNames = options.map(item => (groups.includes(item.key) ? item.text : null));
    return groupNames.map(item => (
      <List.Item>
        <List.Content>
          <List.Header>{item}</List.Header>
        </List.Content>
      </List.Item>
    ));
  }

  renderComments() {
    const notes = this.props.profileNotes;
    return notes.map((note) => {
      if (!note.event) {
        return (
          <Comment>
            <Comment.Content>
              <Comment.Author>{note.created_by_name}</Comment.Author>
              <Comment.Metadata>
                {moment(note.created_at).format('LL')}
              </Comment.Metadata>
              <Comment.Text>
                {note.note}
              </Comment.Text>
            </Comment.Content>
            { this.props.user.fullName === note.created_by_name ?
              <ConfirmModal
                text='törölni akarod a megjegyzést'
                button={
                  <Button
                    compact
                    color='red'
                    size='mini'
                  >
                    Delete
                  </Button>
                }
                onAccept={() => this.props.deleteNote(note)}
              />
            :
            null }
          </Comment>);
      }
      return '';
    });
  }

  render() {
    const note = this.props.actualNote;
    const { id, signed, groups, role, full_name, nick, motivation_about, motivation_exercise, motivation_profession }
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
                <Header as='h3'>Érdeklődés:</Header>
                { groups ?
                  <List horizontal>
                    {this.renderGroups()}
                  </List>
                  :
                  null
                }
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
          <Container>
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
            <Comment.Group>
              <Header dividing>
                Megjegyzések
              </Header>
              {this.renderComments()}
              <Form reply>
                <Form.TextArea
                  value={note.note}
                  onChange={e => this.props.writeNote(e)}
                />
                <Button
                  onClick={() => {
                                  this.props.postNote({ userid: id,
                                                        note: note.note });
                                  this.props.clearWrite();
                                }
                          }
                  content='Megjegyzés hozzáadása'
                  labelPosition='left'
                  icon='edit'
                  primary
                />
              </Form>
            </Comment.Group>
          </Container>
          :
          null
        }
      </Container>
    );
  }
}

const mapStateToProps = ({
  user,
  trainees: { selectedProfile },
  notes: { profileNotes, actualNote }
}) => ({ user, selectedProfile, profileNotes, actualNote });

export default connect(mapStateToProps, {
  getSelectedProfile,
  setStatus,
  postNote,
  getNotesByProfile,
  writeNote,
  deleteNote,
  clearWrite,
})(ApplicantProfile);
