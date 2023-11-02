import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './ngshop/pages/home-page/home-page.component';
import { FooterComponent } from './ngshop/shared/footer/footer.component';
import { HeaderComponent } from './ngshop/shared/header/header.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './ngshop/shared/nav/nav.component';
import { ProductsModule } from 'projects/products/src/public-api';
import { UiModule } from 'projects/ui/src/public-api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { OrdersModule } from 'projects/orders/src/public-api';
import { MessagesComponent } from './ngshop/shared/messages/messages.component';
import { ToastModule } from 'primeng/toast';
import { UsersModule } from 'projects/users/src/public-api';
import { NgxStripeModule } from 'ngx-stripe';



const routes : Routes =[
  {path:'',component:HomePageComponent},
  
]


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    MessagesComponent,
  
  
    ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes) ,
    UiModule  ,
    AccordionModule,
     BrowserAnimationsModule,
    ProductsModule,
    HttpClientModule ,
    OrdersModule,
    ToastModule,
    UsersModule,
    NgxStripeModule.forRoot('pk_test_51N6ebULVbJpIoXMkdWfWORPHhGMEZnqlAxsUSH6kbU115IdEKyBpvoREOT8lbwcKV35e7XZb40Fn29gcjvkkWNkT00dRN0W47L')
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
