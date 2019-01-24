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
      <>
        <Accordion.Title
          active={activeIndex === event.id}
          index={event.id}
          onClick={this.handleClick}
        >
          <h2>
             <Grid>
              <Grid.Column floated='left' width={5} textAlign='left'>
                 <Icon name='quidditch' color='blue' />{event.name}
              </Grid.Column>
              <Grid.Column floated='right' width={8} textAlign='right'>
                {moment(event.date).locale('hu').format('LLLL')}
              </Grid.Column>
            </Grid>
          </h2>
         </Accordion.Title>
         <Accordion.Content active={activeIndex === event.id}>
           <p>
             {event.description}
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

export default connect(mapStateToProps, { getStudentEvents })(Schedule);
