import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleViewComponent } from './single-view/single-view.component';
import { MultiViewComponent } from './multi-view/multi-view.component';
import { UpdateViewComponent } from './update-view/update-view.component';
import { NbUserModule, NbContextMenuComponent, NbContextMenuModule, NbListItemComponent, NbListModule, NbCardModule } from '@nebular/theme';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    SingleViewComponent, 
    MultiViewComponent, 
    UpdateViewComponent
  ],

  imports: [
    UserRoutingModule,
    CommonModule,
    NbUserModule,
    NbContextMenuModule,
    NbListModule,
    NbCardModule
  ],
  providers:[
    
  ]
})
export class UsersModule { }
