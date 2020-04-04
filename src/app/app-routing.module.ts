import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAdminComponent } from './components/user-management/admin/list-admin/list-admin.component';
import { HeaderComponent } from './layout/header/header.component';

import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';


const routes: Routes = [
  {path:'',component:HeaderComponent},
  {path:'login',component:LoginComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  {path:'forget-password',component:ForgetPasswordComponent},
  {path:'admin/list',component:ListAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
