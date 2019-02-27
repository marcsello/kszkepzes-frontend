import React, { Component } from 'react';
import { Message, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { dismissMessage } from '../actions/messages';

const messages = [
  {
    type: 'success',
    icon: 'thumbs up',
    title: 'Sikeres művelet',
    success: true,
    warning: false,
    error: false,
  },
  {
    type: 'warning',
    icon: 'warning',
    title: 'Figyelmeztetés',
    success: false,
    warning: true,
    error: false,
  },
  {
    type: 'error',
    icon: 'times circle',
    title: 'Sikertelen művelet',
    success: false,
    warning: false,
    error: true,
  },
];

class AlertMessage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      timeout: null,
    }
  }
componentWillReceiveProps() {
    clearTimeout(this.state.timeout);
    const time = setTimeout(() => {
      this.props.dismissMessage();
    }, 4000);
    this.setState({ timeout: time });
  }

  render() {
    const { visible, messageType, text } = this.props.message;
    const messageProps = messages.find(item => item.type === messageType);
    return (
      <Container style={visible ? { padding: '1.5em', paddingBottom: '0.5em' } : { padding: '0em' }}>
        { messageProps ?
          <Message
            icon={messageProps.icon}
            visible={visible}
            header={messageProps.title}
            content={text}
            positive={messageProps.success}
            warning={messageProps.warning}
            negative={messageProps.error}
          />
        :
        null
        }
      </Container>
    );
  }
}

const mapStateToProps = ({ message }) => ({
  message
});

export default connect(mapStateToProps, { dismissMessage })(AlertMessage)
