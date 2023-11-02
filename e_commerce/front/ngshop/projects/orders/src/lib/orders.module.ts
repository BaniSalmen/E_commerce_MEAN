import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';
import { CommonModule } from '@angular/common';
import { CardService } from './services/card.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';


import { InputMaskModule } from 'primeng/inputmask';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { AuthGuard } from 'projects/users/src/public-api';
import { ProductsModule } from 'projects/products/src/public-api';





const routes : Routes =[
 
  {
    path:'cart' ,
    component:CartPageComponent
  }
  ,
  {
    path: 'checkout',
    canActivate :[AuthGuard],
    component: CheckoutPageComponent
  },
  {
    path: 'success',
    component: ThankYouComponent
  },
  
  
  
  ]

@NgModule({
  declarations: [
    OrdersComponent,
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent
  ],
  imports: [
    CommonModule,
    BadgeModule,
    RouterModule.forChild(routes),
    ButtonModule,
    InputNumberModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    
    ],
  exports: [
    CartIconComponent,CartPageComponent,OrderSummaryComponent,CheckoutPageComponent, ThankYouComponent
  ]
})
export class OrdersModule { 
  constructor(CardService :CardService){
    CardService.initCartLocalStorage();
  }
}
