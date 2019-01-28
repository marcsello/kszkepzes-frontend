import React, { Component } from 'react';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { emptyMessage } from '../pages/Homework';

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
        noSubmitStudents.push(this.props.homeworks.profiles[i].nick);
      } else if (taskSolutions[taskSolutions.length - 1].corrected === false) {
        waitForCorrectionStudents.push(this.props.homeworks.profiles[i].nick);
      } else if (taskSolutions[taskSolutions.length - 1].accepted === false) {
        noAcceptStudents.push(this.props.homeworks.profiles[i].nick);
      } else {
        acceptedStudents.push(this.props.homeworks.profiles[i].nick);
      }
    }

    const emptyStudentText = 'Nincs ilyen képződő jelenleg.';

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
        <Modal.Header>
          A megoldások beadásának állapota a(z) {this.props.tasktitle} nevű feladatnál:
        </Modal.Header>
        <Modal.Content>
          <Header as='h3'>Nem érkezett még megoldás:</Header>
          {noSubmitStudents.length === 0 ?
              emptyMessage(emptyStudentText) :
              noSubmitStudents.map(name => (
                <Button color='blue' style={{ marginRight: '1.5em', marginTop: '1.5em' }}>{name}</Button>
              ))
          }
          <Header as='h3'>Javításra vár (A névre kattintva kijavítható a megoldás):</Header>
          {waitForCorrectionStudents.length === 0 ?
            emptyMessage(emptyStudentText) :
            waitForCorrectionStudents.map(name => (
              <Button inverted color='orange' style={{ marginRight: '1.5em', marginTop: '1.5em' }}>{name}</Button>
            ))
          }
          <Header as='h3'>A megoldás nem elfogadható:</Header>
          {noAcceptStudents.length === 0 ?
            emptyMessage(emptyStudentText) :
            noAcceptStudents.map(name => (
              <Button color='red' style={{ marginRight: '1.5em', marginTop: '1.5em' }}>{name}</Button>
            ))
        }
          <Header as='h3'>Elfogadva:</Header>
          {acceptedStudents.length === 0 ?
            emptyMessage(emptyStudentText) :
            acceptedStudents.map(name => (
              <Button color='green' style={{ marginRight: '1.5em', marginTop: '1.5em' }}>{name}</Button>
            ))
        }
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
              }}
          >
            <Icon name='checkmark' /> Beadás
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ homeworks, user }) => ({ homeworks, user });

export default connect(mapStateToProps, {
})(SolutionDetailsForm);
