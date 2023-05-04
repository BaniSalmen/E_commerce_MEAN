import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [ CommonModule, RouterModule
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
