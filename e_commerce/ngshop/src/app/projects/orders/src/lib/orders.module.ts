import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [ CommonModule, RouterModule
  ],
  exports: [
    OrdersComponent
  ]
})
export class OrdersModule { }
