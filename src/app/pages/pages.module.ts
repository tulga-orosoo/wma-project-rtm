import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { TanksModule } from './tanks/tanks.module';
import { TankMaintenancesModule } from './tank-maintenances/tank-maintenances.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    TanksModule,
    TankMaintenancesModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS
  ],
})
export class PagesModule {
}
