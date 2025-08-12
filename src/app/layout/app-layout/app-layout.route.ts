import { Navbar } from '../../components/navbar/navbar';
import { AppLayout } from './app-layout';

export default [
  {
    path: '',
    loadComponent: () =>
      import('../app-layout/app-layout').then((res) => res.AppLayout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../features/dashboard-management/dashboard/dashboard').then(
            (res) => res.Dashboard
          ),
      },
      {
        path: 'drivers',
        loadComponent: () =>
          import('../../features/driver-management/driver/driver').then(
            (res) => res.Driver
          ),
      },
      {
        path: 'driver/:id',
        loadComponent: () =>
          import(
            '../../features/driver-management/view-driver/view-driver'
          ).then((res) => res.ViewDriver),
      },
      {
        path: 'register-driver',
        loadComponent: () =>
          import(
            '../../features/driver-management/register-driver/register-driver'
          ).then((res) => res.RegisterDriver),
      },
      {
        path: 'vehicles',
        loadComponent: () =>
          import('../../features/vehicle-management/vehicle/vehicle').then(
            (res) => res.Vehicle
          ),
      },
      {
        path: 'vehicle/:id',
        loadComponent: () =>
          import(
            '../../features/vehicle-management/view-vehicle/view-vehicle'
          ).then((res) => res.ViewVehicle),
      },
      {
        path: 'register-vehicle',
        loadComponent: () =>
          import(
            '../../features/vehicle-management/register-vehicle/register-vehicle'
          ).then((res) => res.RegisterVehicle),
      },
      {
        path: 'officers',
        loadComponent: () =>
          import(
            '../../features/dashboard-management/officer-list/officer-list'
          ).then((res) => res.OfficerList),
      },

      {
        path: 'violations',
        loadComponent: () =>
          import(
            '../../features/violation-management/register-violation/register-violation'
          ).then((res) => res.RegisterViolation),
      },
      {
        path: 'payment/:id',
        loadComponent: () =>
          import('../../features/driver-management/payment/payment').then(
            (res) => res.Payment
          ),
      },
      {
        path: 'dashboard',
        redirectTo: ""
      },
    ],
  },
];
