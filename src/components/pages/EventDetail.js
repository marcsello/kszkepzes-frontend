import React, { Component } from 'react';
import {
  Container,
  Item,
  Button,
  Comment,
  Form,
  Header,
  Table,
  Segment,
  Icon,
  Checkbox,
  Popup,
  Grid,
  Divider,
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

  UNSAFE_componentWillMount() {
    this.props.getEventById(this.props.match.params.id);
    this.props.getTrainees();
    this.props.getNotesByEvent(this.props.match.params.id);
  }


  renderTrainees() {
    const event = this.props.selectedEvent;
    const note = this.props.actualNote;
    return this.props.trainees?.map((item) => {
      const notes = this.props.eventNotes?.filter(note => note.profile === item.id);
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
      <Segment>
        <Item>
          <Divider style={{ fontSize: '2em'}} horizontal>
            <Header as='h1'>
              {name}
              <Item.Header as='h5'>
                {moment(date).format('LL')}
              </Item.Header>
            </Header>
          </Divider>
          <Container textAlign='justified'>
            <Item.Header as='h3'>Leírás</Item.Header>
            <Item.Content>{description}</Item.Content>
          </Container>
        </Item>
      </Segment>
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
      <Container style={{paddingTop: '1em', paddingBottom: '7em'}}>
        <Container textAlign='center'>
          { this.props.selectedEvent && this.props.trainees ?
            this.renderEvent()
            :
            ''
        }
        </Container>
          <Table celled centered unstackable>
            <Table.Header>
              <Table.Row textAlign='center'>
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
