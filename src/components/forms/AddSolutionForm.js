import React, { Component } from 'react';
import { Modal, Button, Form, Input, TextArea, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addSolution, writeSolution, writeSolutionFile, addDocument, clearWrite } from '../../actions/homework';

class AddSolutionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    const {
      name, description, file
    } = this.props.newSolution;
    const task = this.props.taskid;
    const corrected = false;
    const accepted = false;
    const note = '';
    let solution = 1;
    if((this.props.homeworks.solutions[this.props.homeworks.solutions.length - 1]) !== undefined)
      solution = (this.props.homeworks.solutions[this.props.homeworks.solutions.length - 1]).id;
    return (
      <Modal
        open={this.state.showModal}
        trigger={
          <Button basic color='blue' onClick={() => { this.setState({ showModal: true }); }}>
            <Icon name='external' />
            {this.props.tasktitle}
          </Button>
        }
      >
        <Modal.Header>Új megoldás beadása a {this.props.tasktitle} nevű feladathoz:</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field
              control={Input}
              label='Cím:'
              name='name'
              onChange={e => this.props.writeSolution(e)}
              value={name}
              placeholder='Add meg a dokumentum címét'
            />
            <Form.Field
              control={TextArea}
              label='Leírás:'
              name='description'
              onChange={e => this.props.writeSolution(e)}
              value={description}
              placeholder='Add meg a megoldás leírását...'
            />
            <Form.Field>
              <label>Fájl:</label>
              <Input type='file' onChange={e => this.props.writeSolutionFile(e)} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            inverted
            color='red'
            onClick={() => {
              this.setState({ showModal: false });
            }}
          >
            <Icon name='remove' /> Mégse
          </Button>
          <Button
            inverted
            color='green'
            onClick={() => {
              this.props.addSolution({
                 task, accepted, corrected, note,
               });
              this.props.addDocument({ name, description, file, solution });
              this.setState({ showModal: false });
              }}
          >
            <Icon name='checkmark' /> Beadás
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ newSolution, homeworks, user }) => ({ newSolution, homeworks, user });

export default connect(mapStateToProps, {
  addSolution,
  writeSolution,
  writeSolutionFile,
  addDocument,
  clearWrite,
})(AddSolutionForm);
