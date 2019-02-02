import React, { Component } from 'react';
import { Container, Accordion, Icon, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getStudentEvents } from '../../actions/statistics';

class Schedule extends Component {
  state = { activeIndex: 0 }

  componentWillMount() {
      this.props.getStudentEvents();
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
      <div>
        <Accordion.Title
          active={activeIndex === event.id}
          index={event.id}
          onClick={this.handleClick}
        >
          <h3>
             <Grid>
              <Grid.Column floated='left' width={8} textAlign='left'>
                 <Icon name='angle right' color='blue' />{event.name}
              </Grid.Column>
              <Grid.Column floated='right' width={8} textAlign='right'>
                {moment(event.date).locale('hu').format('LLLL')}
              </Grid.Column>
            </Grid>
          </h3>
         </Accordion.Title>
         <Accordion.Content active={activeIndex === event.id}>
           <p>
             {event.description}
           </p>
         </Accordion.Content>
       </div>
       ));

    return (
      <Container
        textAlign='left'
        style={{
          padding: '60px'
        }}
      >
        <h2>Képzésalkalmak:</h2>
        <Accordion
          fluid
          styled
          defaultActiveIndex={-1}
          panels={panels}
        >
        {panels}
      </Accordion>
      </Container>
    );
  }
}


const mapStateToProps = ({ events: { events }, user }) => ({ events, user });

export default connect(mapStateToProps, { getStudentEvents })(Schedule);
