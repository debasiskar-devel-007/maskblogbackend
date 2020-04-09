import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './services/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoMaterialModule } from 'src/material-module';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';

import { AddEditAdminComponent } from './components/user-management/admin/add-edit-admin/add-edit-admin.component';
import { ListAdminComponent } from './components/user-management/admin/list-admin/list-admin.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import {ListingModule} from 'listing-angular7';
import { AddEditComponent } from './components/blog-management/blog-category/add-edit/add-edit.component';
import { CategoryListComponent } from './components/blog-management/blog-category/category-list/category-list.component';
import { AddEditBlogComponent } from './components/blog-management/blog/add-edit-blog/add-edit-blog.component';
import { ListBlogsComponent } from './components/blog-management/blog/list-blogs/list-blogs.component';
import { LoginModule } from 'login-lib-influxiq';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CKEditorModule } from 'ngx-ckeditor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogModule } from 'blog-lib-influxiq';
import { CookieService } from 'ngx-cookie-service';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
// http-loader section
import { HttpLoaderComponent } from './common/http-loader/http-loader.component';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './common/loader.interceptor';
import { TestComponent } from './test/test.component';
// End http-loader section
import { FileUploadModule } from 'file-upload-lib-influxiq';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AddEditAdminComponent,
    ListAdminComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgetPasswordComponent,
    AddEditComponent,
    CategoryListComponent,
    AddEditBlogComponent,
    ListBlogsComponent,
    DashboardAdminComponent,
    AccountSettingsComponent,

    HttpLoaderComponent,

    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ListingModule,
    HttpClientModule,
    LoginModule,
    FormsModule,
    ReactiveFormsModule,
    BlogModule,
    CKEditorModule,
    FileUploadModule
  ],
  
  providers: [CookieService,AuthGuard,LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents:[]
})
export class AppModule { }
