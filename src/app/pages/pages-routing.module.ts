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
<<<<<<< HEAD
      path: 'tanks', loadChildren: './tanks/tanks.module#TanksModule' },
=======
      path: 'maintenances',
      loadChildren: './tank-maintenances/tank-maintenances.module#TankMaintenancesModule',
    },
>>>>>>> 7e9c4e681d4da91bff0888d9ae3e81e052b8377d
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
