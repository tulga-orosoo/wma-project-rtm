import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
<<<<<<< HEAD
    title: 'Tanks',
    icon: 'nb-home',
    children: [
      {
        title: 'List-tank',
        link: '/pages/tanks',
      },
      {
        title: 'Add-tank',
        link: '/pages/tanks/add-tanks',
      }
=======
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
>>>>>>> 7e9c4e681d4da91bff0888d9ae3e81e052b8377d
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
