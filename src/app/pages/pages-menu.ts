import { NbMenuItem } from '@nebular/theme';
import { link } from 'fs';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-bar-chart',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Tanks',
    icon: 'nb-coffee-maker',
    children: [
      {
        title: 'List-tank',
        link: '/pages/tanks',
      },
      {
        title: 'Add-tank',
        link: '/pages/tanks/add-tanks',
      }
    ]
  }, {
    title: 'Tank Maintenances',
    icon: 'nb-compose',
    link: '/pages/maintenances',
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
  {
    title:'Users',
    icon:'nb-person',
    link:'/pages/users'
  }
];
