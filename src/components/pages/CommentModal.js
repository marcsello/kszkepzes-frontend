import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Comment, Modal } from 'semantic-ui-react';
import { deleteNote } from '../../actions/notes';
import ConfirmModal from '../forms/ConfirmModal';

class CommentModal extends Component {
  renderComments() {
    const { notes, user } = this.props;
    return notes.map((note) => {
      return (
        <Comment style={{ padding: '1em' }} stylekey={note.id}>
          <Comment.Content>
            <Comment.Author><strong>{note.created_by_name}</strong></Comment.Author>
            <Comment.Text>
              {note.note}
            </Comment.Text>
            { note.created_by_name === user.fullName ?
              <ConfirmModal
                text='törölni akarod a megjegyzést'
                button={
                  <Button
                    compact
                    color='red'
                    size='mini'
                  >
                  Delete
                  </Button>
                   }
                onAccept={() => this.props.deleteNote(note)}
              />
              :
              null }
          </Comment.Content>
        </Comment>
      );
    });
  }
  render() {
    return (
      <Modal
        closeIcon
        trigger={
          <Button icon='comment alternate outline' />
        }
      >
        <Modal.Header>Megjegyzések:</Modal.Header>
        <Modal.Content>
          {this.renderComments()}
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { deleteNote })(CommentModal);
