import React, { Component } from 'react';
import {
  Container,
  Header,
  Segment,
  Table,
  Icon,
  Message,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  getTasks,
  getSolutions,
  addTask,
  setSelectedTask,
  deleteTask,
  addDocument,
  getProfiles,
  getDocuments,
} from '../../actions/homework';
import AddTaskForm from '../forms/AddTaskForm';
import AddSolutionForm from '../forms/AddSolutionForm';
import SolutionDetailsForm from '../forms/SolutionDetailsForm';
import EditTaskForm from '../forms/EditTaskForm';
import ConfirmModal from '../forms/ConfirmModal';

const displayTypes = {
  can_submit: {
    text: 'Beadható',
    icon: 'send',
    rowstyle: { warning: false, positive: false, negative: false },
  },
  no_submit: {
    text: 'Beadás elmaradt',
    icon: 'warning circle',
    rowstyle: { warning: true, positive: false, negative: false },
  },
  wait_correction: {
    text: 'Javításra vár',
    icon: 'wait',
    rowstyle: { warning: true, positive: false, negative: false },
  },
  no_accept: {
    text: 'Nem elfogadható',
    icon: 'warning circle',
    rowstyle: { warning: false, positive: false, negative: true },
  },
  accepted: {
    text: 'Elfogadva',
    icon: 'checkmark',
    rowstyle: { warning: false, positive: true, negative: false },
  },
};

export const emptyMessage = (header, text, marginBottom) => (
  <Message
    style={{ marginBottom }}
    icon='info'
    info
    header={header}
    content={text}
  />
);

class Homework extends Component {
  componentDidMount() {
    this.props.getTasks();
    this.props.getSolutions(this.props.user.id);
    this.props.getProfiles();
    this.props.getDocuments();
  }

  getTaskDisplayStyle(task) {
    const taskSolutions = this.props.homeworks.solutions.filter(solution =>
      solution.task === task.id)
      .filter(solution =>
        solution.created_by === this.props.user.id);

    if (taskSolutions.length === 0) {
      if (moment().isBefore(task.deadline)) {
        return 'can_submit';
      }

      return 'no_submit';
    }

    if (taskSolutions[taskSolutions.length - 1].corrected === false) {
      return 'wait_correction';
    }

    if (taskSolutions[taskSolutions.length - 1].accepted === false) {
      return 'no_accept';
    }

    return 'accepted';
  }

  renderTaskList(active, staff) {
    if (!staff) {
      return this.props.homeworks.tasks
        .filter(task => moment().isBefore(task.deadline) === active)
        .map(task => (
          <Table.Row
            key={task.id}
            warning={
            displayTypes[this.getTaskDisplayStyle(task)].rowstyle.warning
          }
            positive={
            displayTypes[this.getTaskDisplayStyle(task)].rowstyle.positive
          }
            negative={
            displayTypes[this.getTaskDisplayStyle(task)].rowstyle.negative
          }
          >
            <Table.Cell>
              <AddSolutionForm
                taskid={task.id}
                tasktitle={task.title}
                taskdesc={task.text}
                multiple={this.getTaskDisplayStyle(task) !== 'can_submit'}
                disabled={moment().isAfter(task.deadline)}
              />
            </Table.Cell>
            <Table.Cell>
              {moment(task.deadline).format('YYYY. MM. DD. HH:mm')}
            </Table.Cell>
            <Table.Cell>
              <Icon name={displayTypes[this.getTaskDisplayStyle(task)].icon} />{' '}
              {displayTypes[this.getTaskDisplayStyle(task)].text}
            </Table.Cell>
          </Table.Row>
        ));
    }

    const deleteButton = (
      <Button
        inverted
        style={{ marginRight: '2em' }}
        color='red'
      >
        <Icon name='x' /> Törlés
      </Button>
    );

    return this.props.homeworks.tasks
      .filter(task => moment().isBefore(task.deadline) === active)
      .map(task => (
        <Table.Row
          key={task.id}
          warning={
          displayTypes[this.getTaskDisplayStyle(task)].rowstyle.warning
        }
          positive={
          displayTypes[this.getTaskDisplayStyle(task)].rowstyle.positive
        }
          negative={
          displayTypes[this.getTaskDisplayStyle(task)].rowstyle.negative
        }
        >
          <Table.Cell>
            <SolutionDetailsForm taskid={task.id} tasktitle={task.title} taskdesc={task.text} />
          </Table.Cell>
          <Table.Cell>
            {moment(task.deadline).format('YYYY. MM. DD. HH:mm')}
          </Table.Cell>
          <Table.Cell>
            <EditTaskForm onClick={() => this.props.setSelectedTask(task)} />
            <ConfirmModal
              button={deleteButton}
              text='törlöd a kiválaszott feladatot a már beadott megoldásokkal együtt'
              onAccept={() => this.props.deleteTask(task)}
            />
          </Table.Cell>
        </Table.Row>
      ));
  }

  renderHomeworksTable(active, staff) {
    let tableColor = 'green';
    let marginBottom = '0em';

    if (!active) {
      tableColor = 'blue';
      marginBottom = '3em';
    }

    if (!staff) {
      return (
        <Table color={tableColor} fixed style={{ marginBottom }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Icon circular name='home' />
              Feladat megnevezése / beadása
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Icon circular name='calendar' />
              Beadási határidő
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Icon circular name='tasks' />
              Állapot
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderTaskList(active, staff)}</Table.Body>
        </Table>
      );
    }
    return (
      <Table color={tableColor} fixed style={{ marginBottom }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Icon circular name='home' />
              Feladat megnevezése / Beadások állapota
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Icon circular name='calendar' />
              Beadási határidő
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Icon circular name='edit' />
              Módosítás / Törlés
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderTaskList(active, staff)}</Table.Body>
      </Table>
    );
  }

  renderHomeworks(active, staff) {
    let empty = false;
    let emptyText = 'Jelenleg nincs egyetlen beadható feladat sem. ';
    let marginBottom = '0em';
    const emptyHeaderText = 'Nincs feladat.';
    let headerText = 'Aktív feladatok';

    if (staff) {
      headerText = 'Aktív feladatok kijavítása, módosítása vagy törlése';
    }

    if (
      this.props.homeworks.tasks.filter(task =>
        moment().isBefore(task.deadline) === active).length === 0
    ) {
      empty = true;
    }

    if (!active) {
      if (staff) {
        headerText = 'Lejárt határidejű feladatok kijavítása, módosítása vagy törlése';
      } else {
        headerText = 'Lejárt határidejű feladatok';
      }
      emptyText = 'Jelenleg nincs egyetlen lejárt határidejű feladat sem.';
      marginBottom = '3em';
    }

    return (
      <Segment style={{ padding: '0 0 2em 0' }} vertical basic>
        <Container>
          <Header
            as='h1'
            dividing
            content={headerText}
            style={{
                fontSize: '2em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '0.5em',
              }}
          />
          {empty
            ? emptyMessage(emptyHeaderText, emptyText, marginBottom)
            : this.renderHomeworksTable(active, staff)}
        </Container>
      </Segment>
    );
  }

  render() {
    if (this.props.user.role === 'Student') {
      return (
        <div>
          {this.renderHomeworks(true, false)}
          {this.renderHomeworks(false, false)}
        </div>
      );
    } else if (this.props.user.role === 'Staff') {
      return (
        <div>
          <Segment style={{ padding: '0 0 2em 0' }} vertical basic>
            <Container>
              <Header
                as='h1'
                dividing
                content='Új házi feladat létrehozása'
                style={{
                      fontSize: '2em',
                      fontWeight: 'normal',
                      marginBottom: '0.5em',
                      marginTop: '0.5em',
                    }}
              />
              <Button.Group>
                <AddTaskForm />
              </Button.Group>
            </Container>
          </Segment>
          {this.renderHomeworks(true, true)}
          {this.renderHomeworks(false, true)}
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = ({ selectedTask, homeworks, user }) => ({ selectedTask, homeworks, user });

export default connect(
  mapStateToProps,
  {
    getTasks,
    setSelectedTask,
    getSolutions,
    addTask,
    deleteTask,
    addDocument,
    getProfiles,
    getDocuments,
  },
)(Homework);
