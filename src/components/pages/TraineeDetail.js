import React, { Component } from 'react';
import {
  Container,
  Item,
  Button,
  Comment,
  Form,
  Header,
  Table,
  Icon,
  Checkbox,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getEvents, getTraineeById } from '../../actions/statistics';

class TraineeDetail extends Component {

  componentWillMount() {
    this.props.getTraineeById(this.props.match.params.id);
    //this.props.getNotesByTrainee(this.props.match.params.id);
    this.props.getEvents();
  }

  renderTrainee() {
    const { full_name, nick } = this.props.selectedTrainee;
    return (
      <Item>
        <Item.Header as='h2'>{full_name}</Item.Header>
        <Item.Header as='h3'>{nick}</Item.Header>
      </Item>
    );
  }

  render() {
    return (
      <Container>
        <Container textAlign='center'>
          { this.props.selectedTrainee ?
            this.renderTrainee()
            :
            ''
          }
        </Container>
        <Container
          style={{
            padding: '80px',
          }}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ events: { events }, trainees: { selectedTrainee } }) => ( { events, selectedTrainee });

export default connect(mapStateToProps, { getEvents, getTraineeById })(TraineeDetail);
