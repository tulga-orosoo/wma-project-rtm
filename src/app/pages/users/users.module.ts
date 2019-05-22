import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleViewComponent } from './single-view/single-view.component';
import { MultiViewComponent } from './multi-view/multi-view.component';
import { UpdateViewComponent } from './update-view/update-view.component';
import { NbUserModule, NbContextMenuModule, NbListModule, NbCardModule, NbLayoutModule, NbAlertComponent, NbAlertModule, NbInputModule, NbButtonModule, NbCheckboxModule, NbOverlayModule } from '@nebular/theme';
import { UserRoutingModule } from './user-routing.module';
import { SelectorComponent } from '../../controls/selector/selector.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SingleViewComponent, 
    MultiViewComponent, 
    UpdateViewComponent,
    SelectorComponent
  ],

  imports: [
    UserRoutingModule,
    CommonModule,
    NbUserModule,
    NbContextMenuModule,
    NbListModule,
    NbCardModule,
    NbLayoutModule,
    NbAlertModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbOverlayModule
  ],
  providers:[
    
  ]
})
export class UsersModule {

 }
