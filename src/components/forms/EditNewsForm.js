import React, { Component } from 'react';
import { Modal, Button, Form, Input, TextArea, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { writeNews, editNews, clearWrite } from '../../actions/news';

class EditNewsForm extends Component {
  render() {
    const { id, title, text } = this.props.selectedNews;
    const editedBy = this.props.user.id;
    return (
      <Modal onOpen={this.props.onClick} trigger={<Button size='mini' >Edit</Button>}>
        <Modal.Header>Szerkesztés:</Modal.Header>
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
          <Button inverted color='red' >
            <Icon name='remove' /> Cancel
          </Button>
          <Button
            inverted
            color='green'
            onClick={() => {
                    this.props.editNews({
                                       id, title, text, editedBy,
                                      });
                    this.props.clearWrite();
                    }}
          >
            <Icon name='checkmark' /> Edit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ user, selectedNews }) => ({ user, selectedNews });

export default connect(mapStateToProps, {
  editNews, writeNews, clearWrite,
})(EditNewsForm);
