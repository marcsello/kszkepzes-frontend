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
import { writeNote, clearWrite, postNote, deleteNote } from '../../actions/notes';
import CommentModal from './CommentModal'

class TraineeTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
    }
  }

<<<<<<< HEAD:src/components/pages/TraineeTableRow.js
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
=======
  // Hides and shows the Add and More popup 
  triggerAdd = () => this.setState({ ...this.state, showAddPopup: !this.state.showAddPopup})
  triggerMore = () => this.setState({ ...this.state, showMorePopup: !this.state.showMorePopup })

  render() {
    const note = this.props.actualNote;
    const { trainee, selectedEvent, notes } = this.props;
    const isVisitor = selectedEvent.visitors.includes(trainee.id);
    const isAbsent = selectedEvent.absent.includes(trainee.id);
    return (
      <Table.Row>
        <Table.Cell textAlign='center'>
          {trainee.full_name}
        </Table.Cell>
        {/* Show and change Visitors status  */}
        {!this.props.edit ?
>>>>>>> dev:src/components/pages/EventDetailTableRow.js
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
<<<<<<< HEAD:src/components/pages/TraineeTableRow.js
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
=======
            <Dropdown
              defaultValue={isVisitor ? 'Visitor' : isAbsent ? 'Absent' : 'No'}
              selection
              options={visitStates}
              onChange={(_, v) => {
                this.props.visitorChange({ id : trainee.id, value: v.value })
                // Submit with error check
                this.props.submitVisitors(this.props.selectedEvent)
                  .then( value => {
                    if(value === true) {
                      console.log('success')
                    } else {
                      console.log('error')
                    }
                  })
              }}
>>>>>>> dev:src/components/pages/EventDetailTableRow.js
            />
             
          </Table.Cell>
        }
        {/* Notes for trainees */}
        <Table.Cell>
          <Grid>
            <Grid.Row>
<<<<<<< HEAD:src/components/pages/TraineeTableRow.js
              <Grid.Column floated='left' width={11} textAlign='left'>

=======
              {/* Note text */}
              <Grid.Column floated='left' width={8}>
>>>>>>> dev:src/components/pages/EventDetailTableRow.js
                {notes.length > 0 ?
                  <Comment>
                    <Comment.Content>
                      <Comment.Author><b>{notes[0].created_by_name}:</b></Comment.Author>
                      <Comment.Text style={{wordWrap: 'break-word'}}>
                        {notes[0].note.length > 25 ? 
                          notes[0].note.slice(0, 25).concat('...')
                        :
                          notes[0].note 
                        }
                      </Comment.Text>
                    </Comment.Content>
                  </Comment>
                :
                  null
                }
              </Grid.Column>
<<<<<<< HEAD:src/components/pages/TraineeTableRow.js
              <Grid.Column floated='right' width={5} textAlign='right'>
                {notes.length > 0 ?
                  <CommentModal notes={notes} />
             :
             null}
                <Popup
                  trigger={<Button icon='plus' onClick={this.triggerAdd}/>}
                  on='click'
                  position='bottom left'
=======
              {/* Note buttons */}
              <Grid.Column floated='right' width={6} textAlign='right'>
                {notes.length > 0 ?
                  <Popup basic
                    open={this.state.showMorePopup}
                    trigger={
                      <Button icon='comment alternate outline' onClick={this.triggerMore} />
                    }
                    content={notes.map((note) => {
                      return (
                        <Comment.Content>
                          <Comment.Author><b>{note.created_by_name}:</b></Comment.Author>
                          <Comment.Text>
                            {note.note}
                          </Comment.Text>
                        </Comment.Content>
                      );
                    })}
                  />
                :
                  null
                }
                <Popup basic
                  trigger={
                    <Button icon='plus' onClick={this.triggerAdd}/>
                  }
                  open={this.state.showAddPopup}
>>>>>>> dev:src/components/pages/EventDetailTableRow.js
                  content={
                    <Form reply>
                      <Form.TextArea
                        value={this.state.note}
                        onChange={e => this.handleWrite(e)}
                      />
                      <Button primary
                        onClick={() => {
<<<<<<< HEAD:src/components/pages/TraineeTableRow.js
                                        this.props.postNote({ eventid:selectedEvent.id,
                                                                  userid: trainee.id,
                                                                  note: this.state.note });
                                        this.clearWrite();
                                      }
                                }
=======
                          this.triggerAdd()
                          this.props.postEventNote({ 
                            eventid: selectedEvent.id,
                            userid: trainee.id,
                            note: note.note 
                          })
                          this.props.clearWrite()
                        }}
>>>>>>> dev:src/components/pages/EventDetailTableRow.js
                        content='Megjegyzés hozzáadása'
                        labelPosition='left'
                        icon='edit'
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

<<<<<<< HEAD:src/components/pages/TraineeTableRow.js
export default connect(() => ({}), { writeNote, clearWrite, postNote, visitorChange, deleteNote })(TraineeTableRow)
=======
export default connect(mapStateToProps, 
  { writeNote, clearWrite, postEventNote, 
    visitorChange, submitVisitors})
    (TraineeTableRow)
>>>>>>> dev:src/components/pages/EventDetailTableRow.js
