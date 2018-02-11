import { withRouter } from 'react-router-dom';

export const publicRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/home',
  },
  {
    path: '/news',
  },
  {
    path: '/',
  },
  {
    component: NotFound,
  },
];

export const privateRoutes = [
  {
    path: '/home',
    component: withRouter(Home),
  },
  {
    path: '/store/details',
    component: withRouter(Detail),
  },
]
