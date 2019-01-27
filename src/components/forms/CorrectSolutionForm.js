import React, { Component } from 'react';
import { Modal, Button, Form, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

class CorrectSolutionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    const taskSolutions = this.props.homeworks.solutions.filter(solution =>
      solution.task === this.props.taskid);
    const solutionProfileIds = [...new Set(taskSolutions.map(sol => sol.created_by))];
    const solutionProfiles =
    this.props.homeworks.profiles.filter(profile => solutionProfileIds.includes(profile.id));
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
        <Modal.Header>Új javítás beadása a(z) {this.props.tasktitle} nevű feladathoz:</Modal.Header>
        <Modal.Content>
          <Form>
            <p>Eddig a feladatot beadták:</p>
            {solutionProfiles.map(profile => (
              <p>{profile.full_name}</p>
            ))}
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
})(CorrectSolutionForm);
