import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddTanksComponent} from './add-tanks/add-tanks.component'
import { TanksComponent } from './tanks.component';

const routes: Routes = [{
    path: '',
    component: TanksComponent,
  },
  {
    path: 'add-tanks',
    component: AddTanksComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TanksRoutingModule { }
