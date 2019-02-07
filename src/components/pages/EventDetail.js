import React, { Component } from 'react';
import {
  Container,
  Item,
  Button,
  Comment,
  Form,
  Header,
  Table,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getEventById, getTrainees, visitorChange, submitVisitors } from '../../actions/statistics';
import { getNotesByEvent, writeNote, clearWrite, postNote, deleteNote } from '../../actions/notes';
import TraineeTableRow from './TraineeTableRow';
import ConfirmModal from '../forms/ConfirmModal';

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
  }

  componentWillMount() {
    this.props.getEventById(this.props.match.params.id);
    this.props.getTrainees();
    this.props.getNotesByEvent(this.props.match.params.id);
  }


  renderTrainees() {
    const event = this.props.selectedEvent;
    return this.props.trainees.map((item) => {
      const notes = this.props.eventNotes.filter(note => note.profile === item.id);
      return (
        <TraineeTableRow
          selectedEvent={event}
          notes={notes}
          trainee={item}
          edit={this.state.edit}
        />
      );
    });
  }

  renderEvent() {
    const { name, date, description } = this.props.selectedEvent;
    return (
      <Item>
        <Item.Header as='h2'>{name}</Item.Header>
        <Item.Header as='h3'>Dátum: {moment(date).format('LL')}</Item.Header>
        <Container textAlign='justified'>
          <Item.Header as='h3'>Leírás</Item.Header>
          <Item.Content>{description}</Item.Content>
        </Container>
      </Item>
    );
  }

  renderComments() {
    const notes = this.props.eventNotes;
    return notes.map((note) => {
      if (!note.profile) {
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
    const event = this.props.selectedEvent;
    const note = this.props.actualNote;
    return (
      <Container
        style={{
          padding: '80px'
        }}
      >
        <Container textAlign='center'>
          { this.props.selectedEvent && this.props.trainees ?
            this.renderEvent()
            :
            ''
        }
        </Container>
          <Table centered>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Név</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Jelen volt</Table.HeaderCell>
                <Table.HeaderCell>Megjegyzések</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { this.props.selectedEvent && this.props.trainees ?
                this.renderTrainees()
                :
                ''
              }
            </Table.Body>
          </Table>
          <Button
            inverted
            color='orange'
            onClick={() => this.setState({ edit: true })}
          >
          Szerkeszt
          </Button>
          { this.state.edit ?
            <Button
              inverted
              color='blue'
              onClick={() => {
                              this.setState({ edit: false });
                              this.props.submitVisitors(this.props.selectedEvent);
                            }
                      }
            >Mentés
            </Button>
            :
            ''
          }
          <Comment.Group>
            <Header dividing>
              Megjegyzések
            </Header>
            {this.props.eventNotes ?
              this.renderComments()
              :
              ''
            }
            <Form reply>
              <Form.TextArea
                value={note.note}
                onChange={e => this.props.writeNote(e)}
              />
              <Button
                onClick={() => {
                                this.props.postNote({ eventid: event.id,
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
    );
  }
}

const mapStateToProps = ({
  user,
  notes: { eventNotes, actualNote },
  events: { selectedEvent },
  trainees: { trainees }
}) => ({ user, eventNotes, selectedEvent, trainees, actualNote });

export default connect(mapStateToProps, {
  getEventById,
  getTrainees,
  visitorChange,
  getNotesByEvent,
  submitVisitors,
  writeNote,
  clearWrite,
  postNote,
  deleteNote,
})(EventDetail);
