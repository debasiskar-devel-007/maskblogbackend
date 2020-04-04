import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAdminComponent } from './components/user-management/admin/list-admin/list-admin.component';
import { HeaderComponent } from './layout/header/header.component';


const routes: Routes = [
  {path:'',component:HeaderComponent},
  {path:'admin/list',component:ListAdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
