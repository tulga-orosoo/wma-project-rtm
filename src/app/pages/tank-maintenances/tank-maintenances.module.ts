import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';

import { TankMaintenancesRoutingModule } from './tank-maintenances-routing.modules';
import { AddTankMaintenanceComponent } from './add-tank-maintenance/add-tank-maintenance.component';
import { EditTankMaintenanceComponent } from './edit-tank-maintenance/edit-tank-maintenance.component';
import { TankMaintenancesComponent } from './tank-maintenances.component';

@NgModule({
  declarations: [
    AddTankMaintenanceComponent,
    EditTankMaintenanceComponent,
    TankMaintenancesComponent,
  ],
  imports: [
    CommonModule,
    ThemeModule,
    TankMaintenancesRoutingModule
  ]
})
export class TankMaintenancesModule { }
