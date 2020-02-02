import React, { Component } from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';
import './Groups.css';
import GroupCard from '../extra/GroupCard'

import { connect } from 'react-redux';
import { getGroups } from '../../actions/groups';


class Groups extends Component {
  UNSAFE_componentWillMount() {
    this.props.getGroups()
  }

  render() {
    return (
      <div>
        <Segment inverted textAlign='center' vertical>
          <Container>
            <Header
              as='h1'
              content='Köreink'
              inverted
              style={{
                fontSize: '3em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '0.5em',
              }}
            />
          </Container>
        </Segment>
              
        <Segment style={{ padding: '1em 0em 5em' }} vertical>
          <Container text>
            { this.props.groups.map(item => {
              return <GroupCard key={item.id} label={item.name} value={item.description}/>
            })}
          </Container>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = ({ groups }) => ({ groups });

export default connect(mapStateToProps, { getGroups })(Groups);
