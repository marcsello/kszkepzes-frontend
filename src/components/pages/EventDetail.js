import React, { Component } from 'react';
import { Container, Item, Dropdown, Button, Label, Comment, Form, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getEventById, getTrainees, visitorChange, getNotesByEvent, submitVisitors } from '../../actions/statistics';

class EventDetail extends Component {
  componentWillMount() {
    this.props.getEventById(this.props.match.params.id);
    this.props.getTrainees();
    this.props.getNotesByEvent(this.props.match.params.id);
  }

  renderEvent() {
    const { id, name, date, visitors } = this.props.selectedEvent;
    const usernames = this.props.trainees.map((item) => {
      return ({
        key: item.id,
        text: item.full_name,
        value: item.id,
      });
    });

    return (
      <Item>
        <Item.Header as='h2'>{name}</Item.Header>
        <Item.Header as='h3'>Dátum: {moment(date).format('LL')}</Item.Header>
        <Label>Jelen voltak:</Label>
        <Dropdown
          multiple
          selection
          placeholder='Újoncok hozzáadása'
          style={{
            minWidth: '150px',
            maxWidth: '200px',
          }}
          onChange={(_, v) => this.props.visitorChange(v.value)}
          defaultValue={visitors}
          options={usernames}
        />
      <Button onCLick={this.props.submitVisitors({id, visitors})}>
          Megerősítés
        </Button>
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
      )
    );
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
            padding: '80px'
          }}
        >
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
