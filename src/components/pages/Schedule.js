import React, { Component } from 'react';
import { Container, Accordion, Icon, Grid, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/hu';
import { getStudentEvents } from '../../actions/statistics';

class Schedule extends Component {
  state = { activeIndex: 0 }

  UNSAFE_componentWillMount() {
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
<<<<<<< HEAD
      <div>
=======
      <Accordion key={Math.random()}>
>>>>>>> dev
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
<<<<<<< HEAD
           <h4>Leírás:</h4>
           <p>
=======
           <Segment>
>>>>>>> dev
             {event.description}
           </Segment>
         </Accordion.Content>
<<<<<<< HEAD
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
=======
        </Accordion>
       ));

    return (
      <div>
        <Container textAlign='center'>
          <Header
            as='h1'
            content='Képzés alkalmak'
            style={{
                fontSize: '2em',
                fontWeight: 'bold',
                marginBottom: '0.5em',
                marginTop: '0.5em',
              }}
          />
          <Accordion fluid styled>
            {panels}
          </Accordion>
          <Header
            as='h1'
            content='Tábor'
            style={{
                fontSize: '2em',
                fontWeight: 'bold',
                marginBottom: '0.5em',
                marginTop: '1.5em',
              }}
          />
        </Container>
      </div>
>>>>>>> dev
    );
  }
}


const mapStateToProps = ({ events: { events }, user }) => ({ events, user });

export default connect(mapStateToProps, { getStudentEvents })(Schedule);
