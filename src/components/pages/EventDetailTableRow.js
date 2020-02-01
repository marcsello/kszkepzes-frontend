import React, { Component } from 'react';
import {
  Comment,
  Table,
  Icon,
  Popup,
  Grid,
  Button,
  Form,
  Dropdown,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { visitorChange, submitVisitors } from '../../actions/statistics';
import { writeNote, clearWrite, postEventNote } from '../../actions/notes';

const visitStates = [
  {
    text: 'Igen',
    value: 'Visitor',
  },
  {
    text: 'Szólt h nem',
    value: 'Absent',
  },
  {
    text: 'Nem',
    value: 'No',
  }
]

class TraineeTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddPopup: false,
      showMorePopup: false,
    };
  }

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
            />
             
          </Table.Cell>
        }
        {/* Notes for trainees */}
        <Table.Cell>
          <Grid>
            <Grid.Row>
              {/* Note text */}
              <Grid.Column floated='left' width={8}>
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
                  content={
                    <Form reply>
                      <Form.TextArea
                        value={note.note}
                        onChange={e => this.props.writeNote(e)}
                      />
                      <Button primary
                        onClick={() => {
                          this.triggerAdd()
                          this.props.postEventNote({ 
                            eventid: selectedEvent.id,
                            userid: trainee.id,
                            note: note.note 
                          })
                          this.props.clearWrite()
                        }}
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
const mapStateToProps = ({ notes: { actualNote } }) => ({ actualNote })

export default connect(mapStateToProps, 
  { writeNote, clearWrite, postEventNote, 
    visitorChange, submitVisitors})
    (TraineeTableRow)
