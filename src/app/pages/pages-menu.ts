import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Tank Maintenances',
    icon: 'nb-home',
    link: '/pages/maintenances',
    children: [
      {
        title: 'list',
        link: '/pages/maintenances',
      },
      {
        title: 'add',
        link: '/pages/maintenances/add',
      },
      {
        title: 'edit',
        link: '/pages/maintenances/edit:id',
      },
    ]
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
];
