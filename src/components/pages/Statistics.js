import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import Events from './Events'
import Presence from './Presence'
import LeaderBoard from './LeaderBoard'

export default class Statistics extends Component {
  state = { activeItem: 'events' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <div>
          <Container
            textAlign="center"
            style={{paddingBottom: '5em', paddingTop: '1em'}}
          >
          <Menu tabular
            attached='top'
            size='huge'
            compact={true}
          >
            <Menu.Item
              name='events'
              active={activeItem === 'events'}
              onClick={this.handleItemClick}
            >
              Alkalmak
            </Menu.Item>
            <Menu.Item
              name='presence'
              active={activeItem === 'presence'}
              onClick={this.handleItemClick}
            >
              Jelenlét
            </Menu.Item>
            <Menu.Item
              name='leaderboard'
              active={activeItem === 'leaderboard'}
              onClick={this.handleItemClick}
            >
              Ranglista
            </Menu.Item>
          </Menu>
          { activeItem === 'events' ? <Events /> : '' }
          { activeItem === 'presence' ? <Presence /> : '' }
          { activeItem === 'leaderboard' ? <LeaderBoard /> : '' }
        </Container>
      </div>
    );
  }
}
