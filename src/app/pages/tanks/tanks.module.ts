import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTanksComponent } from './add-tanks/add-tanks.component';
import { TanksRoutingModule } from './tanks-routing.module';
import { TanksComponent } from './tanks.component';
import { ThemeModule } from '../../@theme/theme.module';
import { EditTankComponent } from './edit-tank/edit-tank.component';



@NgModule({
  declarations: [
    AddTanksComponent,
    TanksComponent,
    EditTankComponent,
    
  ],
  imports: [
    CommonModule,
    TanksRoutingModule,
    ThemeModule
  ]
})
export class TanksModule { }
