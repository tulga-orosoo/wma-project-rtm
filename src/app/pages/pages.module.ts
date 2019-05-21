import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { UsersComponent } from './users/users.component';
import { UsersModule } from './users/users.module';
import { TanksModule } from './tanks/tanks.module';
import { TankMaintenancesModule } from './tank-maintenances/tank-maintenances.module';


const PAGES_COMPONENTS = [
  PagesComponent,
  UsersComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    UsersModule,
    TanksModule,
    TankMaintenancesModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS
  ],
})
export class PagesModule {
}
