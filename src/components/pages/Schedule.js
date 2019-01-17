import React, { Component } from 'react';
import { Container, Accordion, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getEvents } from '../../actions/statistics';

class Schedule extends Component {
  state = { activeIndex: 0 }

  componentWillMount() {
    this.props.getEvents();
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    const events = this.props.events;
    const panels = events.map(event => (
      <>
        <Accordion.Title
          active={activeIndex === event.id}
          index={event.id}
          onClick={this.handleClick}
        >
          <h2>
           <Icon name='transgender' color='blue' />
           {event.name} {moment(event.date).format('LLL')}
          </h2>
         </Accordion.Title>
         <Accordion.Content active={activeIndex === event.id}>
           <p>
             A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can
             be found as a welcome guest in many households across the world.
           </p>
         </Accordion.Content>
        </>
       ));

    return (
      <Container
        textAlign='center'
        style={{
          padding: '60px'
        }}
      >
        <h2>Képzés alkalmak:</h2>
        <Accordion
          fluid
          styled
          defaultActiveIndex={-1}
          panels={panels}
        >
        {panels}
      </Accordion>
      <h2>Tábor:</h2>
      </Container>
    );
  }
}


const mapStateToProps = ({ events: { events }, user }) => ({ events, user });

export default connect(mapStateToProps, { getEvents })(Schedule);
