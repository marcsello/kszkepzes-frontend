import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react';
import Events from './Events'

export default class Statistics extends Component {
  state = { activeItem: 'events' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <div>
          <Container
            textAlign="center"
            style={{
              padding: '60px',
            }}
          >
          <Menu
            attached='top'
            tabular
            size='huge'
            compact={true}>
            <Menu.Item
              name='events'
              active={activeItem === 'events'}
              onClick={this.handleItemClick}
            >Alkalmak
            </Menu.Item>
            <Menu.Item
              name='trainees'
              active={activeItem === 'trainees'}
              onClick={this.handleItemClick}
            >Képződők
            </Menu.Item>
          </Menu>
          { activeItem === 'events' ? <Events /> : '' }
        </Container>
      </div>
    );
  }
}
