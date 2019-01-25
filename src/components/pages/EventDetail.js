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
import { getNotesByEvent, writeNote, clearWrite, postEventNote } from '../../actions/notes';
import TraineeTableRow from './TraineeTableRow';


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
          <Table celled centered>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Név</Table.HeaderCell>
                <Table.HeaderCell>Jelen volt</Table.HeaderCell>
                <Table.HeaderCell>Megjegyzések</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { this.props.selectedEvent ?
                this.renderTrainees()
                :
                ''
              }
            </Table.Body>
          </Table>
          <Button
            onClick={() => this.setState({ edit: true })}
          >
          Edit
          </Button>
          { this.state.edit ?
            <Button
              onClick={() => {
                              this.setState({ edit: false });
                              this.props.submitVisitors(this.props.selectedEvent);
                            }
                      }
            >Save
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
                                this.props.postEventNote({ eventid: event.id,
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
  notes: { eventNotes, actualNote },
  events: { selectedEvent },
  trainees: { trainees }
}) => ({ eventNotes, selectedEvent, trainees, actualNote });

export default connect(mapStateToProps, {
  getEventById,
  getTrainees,
  visitorChange,
  getNotesByEvent,
  submitVisitors,
  writeNote,
  clearWrite,
  postEventNote,
})(EventDetail);
