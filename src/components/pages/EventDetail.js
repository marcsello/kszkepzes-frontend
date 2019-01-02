import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getEventById } from '../../actions/statistics';

class EventDetail extends Component {
  componentWillMount() {
    this.props.getEventById(this.props.match.params.id);
  }

  renderEvent() {
    const { name, date } = this.props.selectedEvent;
    return (
      <div>
        <p>Alkalom neve: {name}</p>
        <p>Dátum: {date}</p>
      </div>
    );
  }

  render() {
    return (
      <Container>
        {this.props.selectedEvent ?
          this.renderEvent()
          :
          ''
        }
      </Container>
    );
  }
}

const mapStateToProps = ({ user, events: { selectedEvent } }) => ({ user, selectedEvent });

export default connect(mapStateToProps, { getEventById })(EventDetail);
