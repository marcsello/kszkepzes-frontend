import React, { Component } from 'react';
import { Modal, Button, Form, Input, TextArea, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import moment from 'moment';
import { addTask, writeTask, writeTaskDeadline, clearWrite } from '../../actions/homework';

class AddTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    const { title, text, deadline, bits = 1 } = this.props.newTask;
    return (
      <Modal
        open={this.state.showModal}
        closeOnDimmerClick
        onClose={() => this.setState({ showModal: false })}
        trigger={
          <Button
            inverted
            style={{ marginRight: '2em' }}
            color='blue'
            onClick={() => { this.setState({ showModal: true }); }}
          >
            <Icon name='plus' /> Új feladat hozzáadása
          </Button>
        }
      >
        <Modal.Header>Új feladat:</Modal.Header>
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
              label='Beadási határidő (a jelenlegi időnél későbbi időpont):'
              name='deadline'
              placeholder='Beadási határidő'
              iconPosition='left'
              dateTimeFormat='YYYY-MM-DDTHH:mm'
              onChange={(e, { name, value }) => {
                this.props.writeTaskDeadline({ name, value });
              }}
              value={deadline}
            />
            <Form.Field
              control={Input}
              type='number'
              label='Bitek száma:'
              name='bits'
              onChange={e => this.props.writeTask(e)}
              value={bits}
              placeholder='Add meg a feladatért kapható bitek számát ...'
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
            disabled={
              title === '' ||
              title.length > 150 ||
              text === '' ||
              deadline === '' || moment().isAfter(deadline)
            }
            onClick={() => {
              this.props.addTask({ title, text, deadline, bits });
              this.setState({ showModal: false });
              this.props.clearWrite();
              }}
          >
            <Icon name='checkmark' /> Hozzáadás
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ newTask, user }) => ({ newTask, user });

export default connect(mapStateToProps, {
  addTask,
  writeTask,
  writeTaskDeadline,
  clearWrite,
})(AddTaskForm);
