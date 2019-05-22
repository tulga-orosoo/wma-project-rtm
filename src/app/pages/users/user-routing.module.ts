import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultiViewComponent } from './multi-view/multi-view.component';
import { SingleViewComponent } from './single-view/single-view.component';
import { UpdateViewComponent } from './update-view/update-view.component';

export const routes: Routes = [
  // .. here goes our components routes
{
path:'',
redirectTo:'',
component:MultiViewComponent
},
{
  path:':id',
  component:SingleViewComponent
},
{
  path:'edit',
  component:UpdateViewComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {
}
