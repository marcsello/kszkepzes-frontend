import React, { Component } from 'react';
import { Container, Header, Segment, Menu } from 'semantic-ui-react';

export default class Statistics extends Component {
  state = { activeItem: 'events' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <div>
          <Container textAlign="center">
          <Menu tabular compact={true}>
            <Menu.Item name='events' active={activeItem === 'events'} onClick={this.handleItemClick} />
            <Menu.Item
              name='trainees'
              active={activeItem === 'trainees'}
              onClick={this.handleItemClick}
            />
            <Segment inverted textAlign='center' vertical>

            </Segment>
          </Menu>
        </Container>
      </div>
    );
  }
}
