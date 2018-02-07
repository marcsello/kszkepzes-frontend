import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Menu, Button } from 'semantic-ui-react'

import menuItems from './menuItems';

const DesktopMenu = ({user}) => (
  <Segment inverted textAlign='center' vertical>
    <Container>
      <Menu inverted secondary size='large'>

        {menuItems.map(
          (item, i) => (
            <Menu.Item key={i} as={Link} to={item.to}>{item.prefix}{item.text}</Menu.Item>
          )
        )}

        <Menu.Item position='right'>
          {
            user.id ?
              <Button.Group>
                <Button inverted as={Link} to='/profile'>Profilom</Button>
                <Button as='a' href='/api/v1/logout/' icon='sign out' />
              </Button.Group>
            :
              <Button as='a' href='/api/v1/login/authsch/' inverted>Bejelentkezés</Button>
          }
        </Menu.Item>

      </Menu>
    </Container>
  </Segment>
);

export { DesktopMenu };
