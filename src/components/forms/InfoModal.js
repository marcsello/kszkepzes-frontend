import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

class InfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

   close = () => this.setState({ showModal: false })

   open = () => this.setState({ showModal: true})

  render() {
    const { button, title, content } = this.props;
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
        <Header icon='info' content={title} />
        <Modal.Content>
            {content.split('\n').map(s => (<p key={Math.random()}>{s}</p>))}
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='green'
            inverted
            onClick= {() => this.close()}
          >
            <Icon name='checkmark' /> Rendben
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default InfoModal;
