import React from 'react';
import { Image } from 'semantic-ui-react';

import KSZKlogo from '../images/kszk_logo.svg';

const menuItems = [
  {
    text: 'Főoldal',
    to: '/home',
    prefix: <Image size='mini' src={KSZKlogo} style={{ marginRight: '1.5em' }} />,
  },
  {
    text: 'Hírek',
    to: '/news',
    prefix: '',
  },
  {
    text: 'Köreink',
    to: '/groups',
    prefix: '',
  },
  {
    text: 'Ütemterv',
    to: '/schedule',
    prefix: '',
  },
];

export default menuItems;
