import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, Menu } from 'semantic-ui-react'

import menuItems from './menuItems';

const MobileMenu = ({user, sidebarOpened}) => (
  <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
    {menuItems.map( (item, i) => <Menu.Item key={i} as={Link} to={item.to}>{item.text}</Menu.Item>)}
    {
      user.id ?
        <div>
          <Menu.Item as={Link} to='/profile'>Profilom</Menu.Item>
          <Menu.Item as='a' href='/api/v1/logout/' icon='sign out'>Kijelentkezés</Menu.Item>
        </div>
      :
        <Menu.Item as='a' href='/api/v1/login/authsch/'>Bejelentkezés</Menu.Item>
    }
  </Sidebar>
)

export { MobileMenu };
