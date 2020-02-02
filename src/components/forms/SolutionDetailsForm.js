import React, { Component } from 'react';
import { Modal, Button, Header, Icon, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import CorrectSolutionForm from './CorrectSolutionForm';
import { customMessage } from '../pages/Homework';
import './Forms.css';
import {
  getSolutions,
  getDocuments,
} from '../../actions/homework';

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

    this.props.homeworks.profiles.forEach((profile) => {
      const profileSolutions = taskSolutions.filter(solution =>
        solution.created_by === profile.id);

      if (profile.role === 'Student') {
        if (profileSolutions.length === 0) {
          noSubmitStudents.push(profile);
        } else if (profileSolutions[profileSolutions.length - 1].corrected === false) {
          waitForCorrectionStudents.push(profile);
        } else if (profileSolutions[profileSolutions.length - 1].accepted === false) {
          noAcceptStudents.push(profile);
        } else {
          acceptedStudents.push(profile);
        }
      }
    });

    const noStudentText = 'Nincs ilyen képződő jelenleg.';

    return (
      <Modal
        open={this.state.showModal}
        closeOnDimmerClick
        onClose={() => this.setState({ showModal: false })}
        trigger={
          <button
            id='task'
            onClick={() => {
              this.setState({ showModal: true });
              this.props.getSolutions();
              this.props.getDocuments();
            }}
          >
            <Icon name='external' />
            {this.props.tasktitle}
          </button>
        }
      >
        <Modal.Header>
          A megoldások beadásának állapota a(z) {this.props.tasktitle} nevű feladatnál:
        </Modal.Header>
        <Modal.Content>
          <Header as='h3'>A feladat leírása:</Header>
          {this.props.taskdesc.split('\n').map(s => (<p key={Math.random()}>{s}</p>))}
          <Divider />
          <Header as='h3'>Nem érkezett még megoldás:</Header>
          {noSubmitStudents.length === 0 ?
              customMessage(noStudentText) :
              noSubmitStudents.map(student => (
                <Button key={Math.random()} color='blue' style={{ marginRight: '1.5em', marginTop: '1.5em' }}>{student.full_name}</Button>
              ))
          }
          <Divider />
          <Header as='h3'>Javításra vár (A névre kattintva kijavítható a megoldás):</Header>
          {waitForCorrectionStudents.length === 0 ?
            customMessage(noStudentText) :
            waitForCorrectionStudents.map(student => (
              <CorrectSolutionForm
                key={Math.random()}
                color='orange'
                studentName={student.nick}
                studentFullName={student.full_name}
                studentId={student.id}
                taskTitle={this.props.tasktitle}
                taskSolutions={taskSolutions}
              />
            ))
          }
          <Divider />
          <Header as='h3'>A megoldás nem elfogadható (A névre kattintva módosítható a javítás):</Header>
          {noAcceptStudents.length === 0 ?
            customMessage(noStudentText) :
            noAcceptStudents.map(student => (
              <CorrectSolutionForm
                key={Math.random()}
                color='red'
                studentName={student.nick}
                studentFullName={student.full_name}
                studentId={student.id}
                taskTitle={this.props.tasktitle}
                taskSolutions={taskSolutions}
              />
            ))
        }
          <Divider />
          <Header as='h3'>Elfogadva (A névre kattintva módosítható a javítás):</Header>
          {acceptedStudents.length === 0 ?
            customMessage(noStudentText) :
            acceptedStudents.map(student => (
              <CorrectSolutionForm
                key={Math.random()}
                color='green'
                studentName={student.nick}
                studentFullName={student.full_name}
                studentId={student.id}
                taskTitle={this.props.tasktitle}
                taskSolutions={taskSolutions}
              />
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
  getSolutions, getDocuments,
})(SolutionDetailsForm);