import React, { Component } from 'react';
import { Modal, Button, Form, Input, TextArea, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import { writeTask, writeTaskDeadline, editTask, clearWrite } from '../../actions/homework';

class EditTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    const {
      id,
      title,
      text,
      deadline,
    } = this.props.selectedTask;
    return (
      <Modal
        open={this.state.showModal}
        onOpen={this.props.onClick}
        trigger={
          <Button
            inverted
            style={{ marginRight: '2em' }}
            color='orange'
            onClick={() => { this.setState({ showModal: true }); }}
          >
            <Icon name='edit' /> Módosítás
          </Button>
        }
      >
        <Modal.Header>A {title} nevű feladat módosítása:</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              control={Input}
              label='Cím:'
              name='title'
              onChange={e => this.props.writeTask(e)}
              value={title}
              placeholder='Add meg a feladat címét.'
            />
            <Form.Field
              control={TextArea}
              label='Leírás:'
              name='text'
              onChange={e => this.props.writeTask(e)}
              value={text}
              placeholder='Add meg a feladat leírását...'
            />
            <Form.Field
              control={DateTimeInput}
              label='Beadási határidő:'
              name='deadline'
              placeholder='Beadási határidő'
              iconPosition='left'
              dateTimeFormat='YYYY-MM-DDTHH:mm'
              onChange={(e, { name, value }) => {
                this.props.writeTaskDeadline({ name, value });
              }}
              value={deadline}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            inverted
            color='red'
            onClick={() => {
              this.setState({ showModal: false });
              this.props.clearWrite();
            }}
          >
            <Icon name='remove' /> Mégse
          </Button>
          <Button
            inverted
            color='green'
            onClick={() => {
              this.props.editTask({
                id,
                title,
                text,
                deadline,
              });
              this.setState({ showModal: false });
              this.props.clearWrite();
              }}
          >
            <Icon name='checkmark' /> Módosítás
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ selectedTask, user }) => ({ selectedTask, user });

export default connect(mapStateToProps, {
  writeTask,
  writeTaskDeadline,
  editTask,
  clearWrite,
})(EditTaskForm);
