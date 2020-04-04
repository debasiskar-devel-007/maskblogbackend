import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAdminComponent } from './components/user-management/admin/list-admin/list-admin.component';
import { HeaderComponent } from './layout/header/header.component';

import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResolveService } from './services/resolve.service';


const routes: Routes = [
  {path:'',component:HeaderComponent},

  {path:'login',component:LoginComponent},

  {path:'reset-password/:token',component:ResetPasswordComponent},

  {path:'forget-password',component:ForgetPasswordComponent},

  {path:'admin/list',component:ListAdminComponent, 
  resolve: { adminlist: ResolveService },
  data: {
    requestcondition: {
      source: 'data_user',
      condition: {}
    },
    endpoint: 'datalist'
  },
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
