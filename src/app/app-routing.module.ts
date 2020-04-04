import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAdminComponent } from './components/user-management/admin/list-admin/list-admin.component';
import { HeaderComponent } from './layout/header/header.component';
import { ResolveService } from './services/resolve.service';

import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

//blog-category
import {CategoryListComponent } from './components/blog-management/blog-category/category-list/category-list.component';
import { AddEditComponent } from './components/blog-management/blog-category/add-edit/add-edit.component';
//blog-management
import { ListBlogsComponent } from './components/blog-management/blog/list-blogs/list-blogs.component';
import { AddEditBlogComponent } from './components/blog-management/blog/add-edit-blog/add-edit-blog.component';


const routes: Routes = [
  {path:'',component:HeaderComponent},

  {path:'login',component:LoginComponent},

  {path:'reset-password/:token',component:ResetPasswordComponent},

  {path:'forget-password',component:ForgetPasswordComponent},
  {path:'admin/list',component:ListAdminComponent ,resolve: { adminlist: ResolveService },
  data: {
    requestcondition: {
      source: 'data_user',
      condition: {}
    },
    endpoint: 'datalist'
  },},

  // blog management route 
  {
    path : 'blog/category/list',component : CategoryListComponent,
    resolve: { trainingdata: ResolveService }, 
    data: { requestcondition: { source: 'blog_category', condition: {} }, endpoint: 'datalist' }
  },
  {
    path : 'blog/category/add',component : AddEditComponent
  },
  {
    path : 'blog/category/edit',component : AddEditComponent
  },
  {
    path : 'blog/list',component :  ListBlogsComponent
  },
  {
    path : 'blog/add',component : AddEditBlogComponent
  },
  {
    path : 'blog/edit',component : AddEditBlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
