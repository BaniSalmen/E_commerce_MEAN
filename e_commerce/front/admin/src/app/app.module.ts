import { NgModule } from '@angular/core';
import {  HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserModule  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import {EditorModule} from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { CategoriesService } from 'projects/products/src/public-api';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';

import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { UsersModule } from './../../projects/users/src/lib/users.module';
import {  Jwt1Interceptor } from 'projects/users/src/public-api';
import { NgxStripeModule } from 'ngx-stripe';
import {ListboxModule} from 'primeng/listbox';
import { RatingModule } from 'primeng/rating';

const UX_MODULE =[
  CardModule,
  ButtonModule,
  ToolbarModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  DropdownModule,
  InputTextareaModule,
  InputSwitchModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  FieldsetModule,
  MultiSelectModule,
  AutoCompleteModule,
  ListboxModule,
  RatingModule
  
]

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    SidebarComponent,
    DashboardComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductsFormComponent,
    ProductsListComponent,
    UsersListComponent,
    UsersFormComponent,
    OrdersListComponent,
    OrdersDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
   ...UX_MODULE,
   HttpClientModule,
   FormsModule,
   ReactiveFormsModule,
   UsersModule,
   AppRoutingModule,
   NgxStripeModule.forRoot('pk_test_51N6ebULVbJpIoXMkdWfWORPHhGMEZnqlAxsUSH6kbU115IdEKyBpvoREOT8lbwcKV35e7XZb40Fn29gcjvkkWNkT00dRN0W47L')

  ],
  providers: [CategoriesService,MessageService ,ConfirmationService ,
    { provide: HTTP_INTERCEPTORS, useClass : Jwt1Interceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
