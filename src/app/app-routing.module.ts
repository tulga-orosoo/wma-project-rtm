import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { NgModule } from '@angular/core';
// import {
//   NbAuthComponent,
//   NbLoginComponent,
//   NbLogoutComponent,
//   NbRegisterComponent,
//   NbRequestPasswordComponent,
//   NbResetPasswordComponent,
// } from '@nebular/auth';

const routes: Routes = [
  {
    path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: 'app/pages/pages.module#PagesModule'
  },
  {
    path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule'
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
