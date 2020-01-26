import React, { Component } from 'react';
import { Container, Header, Segment, Divider } from 'semantic-ui-react';
import './Groups.css';

import { connect } from 'react-redux';
import { getGroups } from '../../actions/groups';


class Groups extends Component {
  componentWillMount() {
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
              
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            { this.props.groups.map(item => {
              return <div key={item.id}>
                <Header as='h3' style={{ fontSize: '2em' }}>{item.name}</Header>
                <div className='paragraph' dangerouslySetInnerHTML={{__html: item.description}}>
                </div>
              </div>
            })}
          </Container>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = ({ groups }) => ({ groups });

export default connect(mapStateToProps, { getGroups })(Groups);

