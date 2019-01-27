import React, { Component } from 'react';
import { Modal, Button, Form, Input, TextArea, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { postNews, writeNews, clearWrite } from '../../actions/news';

class AddNewsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    const { title, text } = this.props.newNews;
    const author = this.props.user.id;
    return (
      <Modal
        open={this.state.showModal}
        trigger={
          <Button
            size='big'
            onClick={() => { this.setState({ showModal: true }); }}
          >Hír hozzáadása
          </Button>
        }
      >
        <Modal.Header>Új hír:</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              control={Input}
              label='Cím'
              name='title'
              onChange={e => this.props.writeNews(e)}
              value={title}
              placeholder='Cím'
            />
            <Form.Field
              control={TextArea}
              label='Szöveg'
              name='text'
              onChange={e => this.props.writeNews(e)}
              value={text}
              placeholder='Szöveg'
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
            Mégse
          </Button>
          <Button
            inverted
            color='green'
            onClick={() => {
                    this.props.postNews({ title, text, author });
                    this.setState({ showModal: false });
                    this.props.clearWrite();
                    }}
          >
            <Icon name='checkmark' /> Hozzáad
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ newNews, user }) => ({ newNews, user });

export default connect(mapStateToProps, { postNews, writeNews, clearWrite })(AddNewsForm);
