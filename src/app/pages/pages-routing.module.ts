import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { TanksComponent } from './tanks/tanks.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'tanks',
      loadChildren: './tanks/tanks.module#TanksModule'
    },
    {
      path: 'maintenances',
      loadChildren: './tank-maintenances/tank-maintenances.module#TankMaintenancesModule',
    },
    {
      path:'users',
      loadChildren: './users/users.module#UsersModule'
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
