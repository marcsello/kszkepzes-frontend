import React, { Component } from 'react';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import CorrectSolutionForm from './CorrectSolutionForm';
import { emptyMessage } from '../pages/Homework';
import './Forms.css';

class SolutionDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    const taskSolutions = this.props.homeworks.solutions.filter(solution =>
      solution.task === this.props.taskid);

    const noSubmitStudents = [];
    const waitForCorrectionStudents = [];
    const noAcceptStudents = [];
    const acceptedStudents = [];

    for (let i = 0; i < this.props.homeworks.profiles.length; i += 1) {
      const profileSolutions = taskSolutions.filter(solution =>
        solution.created_by === this.props.homeworks.profiles[i].id);

      if (profileSolutions.length === 0) {
        noSubmitStudents.push(this.props.homeworks.profiles[i]);
      } else if (taskSolutions[taskSolutions.length - 1].corrected === false) {
        waitForCorrectionStudents.push(this.props.homeworks.profiles[i]);
      } else if (taskSolutions[taskSolutions.length - 1].accepted === false) {
        noAcceptStudents.push(this.props.homeworks.profiles[i]);
      } else {
        acceptedStudents.push(this.props.homeworks.profiles[i]);
      }
    }

    const emptyStudentText = 'Nincs ilyen képződő jelenleg.';

    return (
      <Modal
        open={this.state.showModal}
        trigger={
          <button id='task' onClick={() => { this.setState({ showModal: true }); }}>
            <Icon name='external' />
            {this.props.tasktitle}
          </button>
        }
      >
        <Modal.Header>
          A megoldások beadásának állapota a(z) {this.props.tasktitle} nevű feladatnál:
        </Modal.Header>
        <Modal.Content>
          <Header as='h3'>Nem érkezett még megoldás:</Header>
          {noSubmitStudents.length === 0 ?
              emptyMessage(emptyStudentText) :
              noSubmitStudents.map(student => (
                <Button color='blue' style={{ marginRight: '1.5em', marginTop: '1.5em' }}>{student.nick}</Button>
              ))
          }
          <Header as='h3'>Javításra vár (A névre kattintva kijavítható a megoldás):</Header>
          {waitForCorrectionStudents.length === 0 ?
            emptyMessage(emptyStudentText) :
            waitForCorrectionStudents.map(student => (
              <CorrectSolutionForm
                studentName={student.nick}
                studentFullName={student.full_name}
                studentId={student.id}
                taskTitle={this.props.tasktitle}
                taskSolutions={taskSolutions}
              />
            ))
          }
          <Header as='h3'>A megoldás nem elfogadható:</Header>
          {noAcceptStudents.length === 0 ?
            emptyMessage(emptyStudentText) :
            noAcceptStudents.map(student => (
              <Button color='red' style={{ marginRight: '1.5em', marginTop: '1.5em' }}>{student.nick}</Button>
            ))
        }
          <Header as='h3'>Elfogadva:</Header>
          {acceptedStudents.length === 0 ?
            emptyMessage(emptyStudentText) :
            acceptedStudents.map(student => (
              <Button color='green' style={{ marginRight: '1.5em', marginTop: '1.5em' }}>{student.nick}</Button>
            ))
        }
        </Modal.Content>
        <Modal.Actions>
          <Button
            inverted
            color='green'
            onClick={() => {
              this.setState({ showModal: false });
              }}
          >
            <Icon name='checkmark' /> Kész
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ homeworks, user }) => ({ homeworks, user });

export default connect(mapStateToProps, {
})(SolutionDetailsForm);
