import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTankMaintenanceComponent } from './add-tank-maintenance/add-tank-maintenance.component';
import { EditTankMaintenanceComponent } from './edit-tank-maintenance/edit-tank-maintenance.component';
import { TankMaintenancesComponent } from './tank-maintenances.component';

const routes: Routes = [{
    path: '',
    component: TankMaintenancesComponent,
  }, {
    path: 'add',
    component: AddTankMaintenanceComponent,
  }, {
    path: 'edit/:id',
    component: EditTankMaintenanceComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})

export class TankMaintenancesRoutingModule {

}
