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
              label='Title'
              name='title'
              onChange={e => this.props.writeNews(e)}
              value={title}
              placeholder='Title'
            />
            <Form.Field
              control={TextArea}
              label='Text'
              name='text'
              onChange={e => this.props.writeNews(e)}
              value={text}
              placeholder='Tell us what you want...'
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
                    this.props.postNews({ title, text, author });
                    this.setState({ showModal: false });
                    this.props.clearWrite();
                    }}
          >
            <Icon name='checkmark' /> Add
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ newNews, user }) => ({ newNews, user });

export default connect(mapStateToProps, { postNews, writeNews, clearWrite })(AddNewsForm);
