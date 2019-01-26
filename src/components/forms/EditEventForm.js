import React, { Component } from 'react';
import { Modal, Button, Form, Input, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import {
  writeEditEvent,
  editEvent,
} from '../../actions/statistics'
import { clearWrite } from '../../actions/news'

class EditEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      date: '',
    };
  }

  // Handling change in redux action creator throws an exception
  // Temporal solotion using the components state to display, instead redux state
  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
    this.props.writeEditEvent({target: {name: name, value: value}})
  }

  render() {
    const { name, date, description } = this.props.editedEvent;
    return (
      <Modal
        open={this.state.showModal}
        trigger={
          <Button
            compact
            onClick={() => { this.props.onClick();
                             this.setState({ showModal: true }); }}
            size='mini'
          >
            Szerkeszt
          </Button>
        }
      >
        <Modal.Header>Alkalom szerkesztése:</Modal.Header>
        <Modal.Content
          style={{
            paddingTop: '20px',
          }}
        >
          <Form>
            <Form.Field
              control={Input}
              label='Név'
              name='name'
              onChange={e => this.props.writeEditEvent(e)}
              value={name}
              style={{
                marginBottom: '20px',
              }}
              placeholder='Név'
            />
            <Form.TextArea
              name='description'
              label='Leírás:'
              placeholder='Rövid leírás'
              value={description}
              onChange={e => this.props.writeEditEvent(e)}
            />
            <DateTimeInput
              name="date"
              label="Dátum:"
              dateFormat='YYYY-MM-DD'
              placeholder="Dátum"
              value={date}
              iconPosition="left"
              onChange={this.handleChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            inverted
            color='red'
            onClick={() => { this.setState({ showModal: false });
                             this.props.clearWrite();
                             }}
          >
            <Icon name='remove' />
            Mégse
          </Button>
          <Button
            inverted
            color='green'
            onClick={() => {
                    this.props.editEvent(this.props.editedEvent);
                    this.setState({ showModal: false, date: '' });
                    this.props.clearWrite();
                    }}
          >
            <Icon name='checkmark' /> Szerkeszt
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ events: { editedEvent } }) => ({ editedEvent });

export default connect(mapStateToProps, { writeEditEvent, editEvent, clearWrite })(EditEventForm);
