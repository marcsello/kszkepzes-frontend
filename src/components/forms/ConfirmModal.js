import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

class ConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

   close = () => this.setState({ showModal: false })

   open = () => this.setState({ showModal: true})

  render() {
    const { button, text, onAccept } = this.props;
    const open = this.state.showModal;
    return (
      <Modal
        open={open}
        closeOnDimmerClick
        trigger={button}
        onOpen={this.open}
        onClose={this.close}
        size='small'
        basic
      >
        <Header icon='question' content='Megerősítés' />
        <Modal.Content>
          <p>
            Biztos hogy {text}?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color='red'
            inverted
            onClick={() => this.close()}
          >
            <Icon name='remove' /> Nem
          </Button>
          <Button
            color='green'
            inverted
            onClick={() => { onAccept(); this.close(); }}
          >
            <Icon name='checkmark' /> Igen
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ConfirmModal;
