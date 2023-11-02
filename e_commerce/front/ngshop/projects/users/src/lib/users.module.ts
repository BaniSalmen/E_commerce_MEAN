import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthGuard, Jwt1Interceptor } from '../public-api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { HomePageConnectComponent } from './pages/home-page-connect/home-page-connect.component';












const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path: 'homeconnect',
    component: HomePageConnectComponent
  }
];

@NgModule({
  declarations: [
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    RegisterFormComponent,
    HomePageConnectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ToolbarModule,
    ToastModule,
    HttpClientModule,
    InputMaskModule,
    InputSwitchModule
   
    
  ],
 

  exports: [
    LoginComponent,UsersComponent,RegisterComponent,HomePageConnectComponent
  ],
  providers:[]
})
export class UsersModule { 

}
