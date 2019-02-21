import React, { Component } from 'react';
import {
  Image,
  Responsive,
  Sidebar,
  Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getUserData } from '../actions';
import KSZKlogo from './images/kszk_logo.svg';

import MobileContainer from './menus/MobileContainer';
import DesktopContainer from './menus/DesktopContainer';


const menuItems = [
  {
    text: 'Főoldal',
    to: '/home',
    prefix: <Image size='mini' src={KSZKlogo} style={{ marginRight: '1.5em' }} />,
    permissionLevel: 0,
  },
  {
    text: 'Hírek',
    to: '/news',
    prefix: '',
    permissionLevel: 0,
  },
  {
    text: 'Köreink',
    to: '/groups',
    prefix: '',
    permissionLevel: 0,
  },
  {
    text: 'Ütemterv',
    to: '/schedule',
    prefix: '',
    permissionLevel: 2,
  },
  {
    text: 'Statisztika',
    to: '/statistics',
    prefix: '',
    permissionLevel: 3,
  },
  {
    text: 'Jelentkezések',
    to: '/applications',
    prefix: '',
    permissionLevel: 3,
  },
  {
    text: 'Házi feladatok',
    to: '/homework',
    prefix: '',
    permissionLevel: 2,
  },
];

const Header = ({ children, user, getUserData }) => (
  <div>
    <DesktopContainer user={user} getUserData={getUserData} menuItems={menuItems}>{children}</DesktopContainer>
    <MobileContainer user={user} getUserData={getUserData} menuItems={menuItems}>{children}</MobileContainer>
  </div>
)

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, { getUserData })(Header);
