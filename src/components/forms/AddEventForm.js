import React, { Component } from 'react';
import { Modal, Button, Form, Input, TextArea, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DateTimeInput } from 'semantic-ui-calendar-react';

// import { clearWrite } from '../../actions/news';
import { writeEvent, eventDate, addEvent } from '../../actions/statistics'

class AddEventForm extends Component {
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
    this.props.eventDate(name, value)
  }

  render() {
    const { name, date } = this.props.newEvent;
    return (
      <Modal
        open={this.state.showModal}
        trigger={
          <Button
            size='big'
            onClick={() => { this.setState({ showModal: true }); }}
          >Alkalom hozzáadása
          </Button>
        }
      >
        <Modal.Header>Új alkalom:</Modal.Header>
        <Modal.Content
          style={{
            paddingTop: '50px',
          }}
        >
          <Form>
            <Form.Field
              control={Input}
              label='Név'
              name='name'
              onChange={e => this.props.writeEvent(e)}
              value={name}
              style={{
                marginBottom: '50px',
              }}
              placeholder='Title'
            />
            <DateTimeInput
              name="date"
              label="Dátum:"
              dateFormat='YYYY-MM-DD'
              placeholder="Date"
              value={this.state.date}
              iconPosition="left"
              onChange={this.handleChange}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            inverted
            color='red'
            onClick={() => { this.setState({ showModal: false }); }}
          >
            <Icon name='remove' />
            Cancel
          </Button>
          <Button
            inverted
            color='green'
            onClick={() => {
                    this.props.addEvent(this.props.newEvent);
                    this.setState({ showModal: false, date: '' });
                    }}
          >
            <Icon name='checkmark' /> Add
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ events: { newEvent } }) => ({ newEvent });

export default connect(mapStateToProps, { writeEvent, addEvent, eventDate })(AddEventForm);
