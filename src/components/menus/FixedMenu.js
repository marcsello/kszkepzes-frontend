import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react'

import menuItems from './menuItems';

const FixedMenu = ({ user }) => (
  <Menu fixed='top' size='large' pointing>
    <Container>
      {menuItems.map( (item, i) => <Menu.Item key={i} as={Link} to={item.to}>{item.text}</Menu.Item>)}

      <Menu.Menu position='right'>
        <Menu.Item className='item'>
          {
            user.id ?
              <Button.Group>
                <Button primary as={Link} to='/profile'>Profilom</Button>
                <Button as='a' href='/api/v1/logout/' icon='sign out' />
              </Button.Group>
            :
              <Button as='a' href='/api/v1/login/authsch/'>Bejelentkezés</Button>
          }
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

export { FixedMenu };
