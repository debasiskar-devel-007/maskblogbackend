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
import { AddEditAdminComponent } from './components/user-management/admin/add-edit-admin/add-edit-admin.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},

  {path:'login',component:LoginComponent},

  {path:'reset-password/:token',component:ResetPasswordComponent},

  {path:'forget-password',component:ForgetPasswordComponent},


  //..............admin section route...................//

  {path:'admin/add',component:AddEditAdminComponent,canActivate: [AuthGuard]},

  {path:'admin/list',component:ListAdminComponent,canActivate: [AuthGuard],
  resolve: { adminlist: ResolveService },
  data: {
    requestcondition: {
      source: 'data_user',
      condition: {}
    },
    endpoint: 'datalist'
  },
},


{path:'admin/edit/:_id',component:AddEditAdminComponent ,canActivate: [AuthGuard],
resolve: { admin_data: ResolveService },
data: {
  requestcondition: {
    source: 'data_user',
    condition: {_id:"_id"}
  },
  endpoint: 'datalist'
},
},




  // blog management route 
  {
    path : 'blog/category/list',component : CategoryListComponent,canActivate: [AuthGuard],
    resolve: { trainingdata: ResolveService }, 
    data: { requestcondition: { source: 'blog_category_view', condition: {} }, endpoint: 'datalist' }
  },
  {
    path : 'blog/category/add',component : AddEditComponent,canActivate: [AuthGuard]
  },
  {
    path : 'blog/category/edit/:_id',component : AddEditComponent,canActivate: [AuthGuard],
    resolve: { blogCatList: ResolveService },
    data: { requestcondition: { source: 'blog_category', condition: {} }, endpoint: 'datalist' }
  },
  {
    path : 'blog-management/list',component :  ListBlogsComponent,canActivate: [AuthGuard],
    resolve: { blogList: ResolveService }, 
    data: { requestcondition: { source: 'blogs_desc_priority', condition: {} }, endpoint: 'datalist' }
  },
  {
    path : 'blog-management/add',component : AddEditBlogComponent,canActivate: [AuthGuard]
  },
  {
    path : 'blog-management/edit/:_id',component : AddEditBlogComponent,canActivate: [AuthGuard],
    resolve: { blogList: ResolveService },
    data: { requestcondition: { source: 'blogs', condition: {} }, endpoint: 'datalist' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
