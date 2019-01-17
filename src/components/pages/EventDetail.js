import React, { Component } from 'react';
import {
  Container,
  Item,
  Button,
  Comment,
  Form,
  Header,
  Table,
  Icon,
  Checkbox,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getEventById, getTrainees, visitorChange, getNotesByEvent, submitVisitors } from '../../actions/statistics';

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
    return this.props.trainees.map((item) => {
      const isVisitor = this.props.selectedEvent.visitors.find(i => i === item.id);
      return (
        <Table.Row>
          <Table.Cell>
            {item.full_name}
          </Table.Cell>
          {!this.state.edit ?
            <Table.Cell textAlign='center'>
              {
                  isVisitor ?
                    <Icon color='green' name='checkmark' />
                  :
                    <Icon color='red' name='cancel' />
                }
            </Table.Cell>
            :
            <Table.Cell textAlign='center'>
              <Checkbox
                defaultChecked={isVisitor ? true : false}
                onChange={() => this.props.visitorChange(item)}
              />
            </Table.Cell>
          }
          <Table.Cell>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  renderEvent() {
    const { id, name, date, visitors } = this.props.selectedEvent;
    return (
      <Item>
        <Item.Header as='h2'>{name}</Item.Header>
        <Item.Header as='h3'>Dátum: {moment(date).format('LL')}</Item.Header>
      </Item>
    );
  }

  renderComments() {
    const notes = this.props.eventNotes;
    return notes.map(note => (
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
      </Comment>
    ));
  }

  render() {
    return (
      <Container>
        <Container textAlign='center'>
          { this.props.selectedEvent && this.props.trainees ?
            this.renderEvent()
            :
            ''
        }
        </Container>
        <Container
          style={{
            padding: '80px',
          }}
        >
          <Table celled centered>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Név</Table.HeaderCell>
                <Table.HeaderCell>Jelen volt</Table.HeaderCell>
                <Table.HeaderCell>Megjegyzések</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { this.props.trainees &&
                this.props.selectedEvent ?
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
              <Form.TextArea />
              <Button content='Megjegyzés hozzáadása' labelPosition='left' icon='edit' primary />
            </Form>
          </Comment.Group>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = ({ notes: { eventNotes }, events: { selectedEvent }, trainees: { trainees } }) => ({ eventNotes, selectedEvent, trainees });

export default connect(mapStateToProps, { getEventById, getTrainees, visitorChange, getNotesByEvent, submitVisitors })(EventDetail);
