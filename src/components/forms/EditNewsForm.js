import React, { Component } from 'react';
import { Modal, Button, Form, Input, TextArea, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';

import { writeNews, editNews, clearWrite } from '../../actions/news';

class EditNewsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    const { id, title, text, author, last_update_by, created_at, updated_at } = this.props.selectedNews;
    const updated_by = this.props.user.id;
    return (
      <Modal
        open={this.state.showModal}
        onOpen={this.props.onClick}
        trigger={
          <Button
            compact
            onClick={() => { this.setState({ showModal: true }); }}
            size='mini'
          >
            Edit
          </Button>
        }
      >
        <Modal.Header>Szerkesztés:</Modal.Header>
        <Modal.Content>
          <p style={{fontStyle: 'italic' }}><b>Közzétéve:</b> {moment(created_at).format('LLLL')} <br />
          <b>Írta:</b> {author} <br />
          <b>Szerkesztve:</b> {moment(updated_at).format('LLLL')} <br />
          <b>Szerkesztette:</b> {last_update_by}</p>
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
            <Icon name='remove' /> Cancel
          </Button>
          <Button
            inverted
            color='green'
            onClick={() => {
                    this.props.editNews({
                                       id, title, text, updated_by,
                                      });
                    this.setState({ showModal: false });
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
