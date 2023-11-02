import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { Jwt1Interceptor } from '../public-api';
import { CategoriesService } from 'projects/products/src/public-api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from './services/users.service';





const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    UsersComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
 

  exports: [
    LoginComponent,UsersComponent
  ]
})
export class UsersModule { 

}
