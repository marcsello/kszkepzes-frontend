import React, { Component } from 'react';
import {
  Comment,
  Table,
  Icon,
  Popup,
  Grid,
  Button,
  Form,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { visitorChange } from '../../actions/statistics';
import { writeNote, clearWrite, postEventNote, deleteNote } from '../../actions/notes';
import CommentModal from './CommentModal'

class TraineeTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
    }
  }

  handleWrite = (e) => {
    this.setState({ ...this.state, note: e.target.value });
  }

  clearWrite = () => {
    this.setState({ ...this.state, note: '' });
  }

  render() {
    const { trainee, edit, selectedEvent, notes } = this.props;
    const isVisitor = selectedEvent.visitors.includes(trainee.id);
    const isAbsent = selectedEvent.absent.includes(trainee.id);
    return (
      <Table.Row key={trainee.id}>
        <Table.Cell>
          {trainee.full_name}
        </Table.Cell>
        {!edit ?
          <Table.Cell textAlign='center'>
            {
                isVisitor ?
                  <Icon color='green' name='checkmark' />
                :
                isAbsent ?
                  <Icon color='orange' name='minus' />
                  :
                  <Icon color='red' name='cancel' />
              }
          </Table.Cell>
          :
          <Table.Cell textAlign='center'>
            <Button
              compact
              icon={<Icon color='green' name='checkmark' />}
              color={isVisitor ? 'blue' : 'lightgrey'}
              onClick={() => this.props.visitorChange({ id: trainee.id, value: 'Visitor' })}
            />
            <Button
              compact
              icon={<Icon color='orange' name='minus' />}
              color={isAbsent ? 'blue' : 'lightgrey'}
              onClick={() => this.props.visitorChange({ id: trainee.id, value: 'Absent' })}
            />
            <Button
              compact
              icon={<Icon color='red' name='cancel' />}
              color={!isVisitor && !isAbsent ? 'blue' : 'lightgrey'}
              onClick={() => this.props.visitorChange({ id: trainee.id, value: 'No' })}
            />
          </Table.Cell>
        }
        <Table.Cell>
          <Grid>
            <Grid.Row>
              <Grid.Column floated='left' width={11} textAlign='left'>

                {notes.length > 0 ?
                  <Comment>
                    <Comment.Content>
                      <Comment.Author>{notes[0].created_by_name}</Comment.Author>
                      <Comment.Text>
                        {notes[0].note.length > 50 ? notes[0].note.slice(0, 50).concat('...')
                         :
                         notes[0].note }
                      </Comment.Text>
                    </Comment.Content>
                  </Comment>
                  :
                  null
                 }
              </Grid.Column>
              <Grid.Column floated='right' width={5} textAlign='right'>
                {notes.length > 0 ?
                  <CommentModal notes={notes} />
             :
             null}
                <Popup
                  trigger={<Button icon='plus' onClick={this.triggerAdd}/>}
                  on='click'
                  position='bottom left'
                  content={
                    <Form reply>
                      <Form.TextArea
                        value={this.state.note}
                        onChange={e => this.handleWrite(e)}
                      />
                      <Button
                        onClick={() => {
                                        this.props.postEventNote({ eventid:selectedEvent.id,
                                                                  userid: trainee.id,
                                                                  note: this.state.note });
                                        this.clearWrite();
                                      }
                                }
                        content='Megjegyzés hozzáadása'
                        labelPosition='left'
                        icon='edit'
                        primary
                      />
                    </Form>
                }
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default connect(() => ({}), { writeNote, clearWrite, postEventNote, visitorChange, deleteNote })(TraineeTableRow)
