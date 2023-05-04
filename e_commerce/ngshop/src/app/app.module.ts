import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomePageComponent } from './ngshop/pages/home-page/home-page.component';
import { ProductListComponent } from './ngshop/pages/product-list/product-list.component';
import { FooterComponent } from './ngshop/shared/footer/footer.component';
import { HeaderComponent } from './ngshop/shared/header/header.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { UiModule } from './projects/ui/src/public-api';
import { AccordionModule } from 'primeng/accordion';



const routes : Routes =[
  {path:'',component:HomePageComponent},
{path:'products',component:ProductListComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomePageComponent,
    ProductListComponent,
    FooterComponent,
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes) ,UiModule  ,AccordionModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
