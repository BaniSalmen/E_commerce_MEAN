import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';



@NgModule({
  declarations: [
    ProductsComponent,ProductsSearchComponent
  ],
  imports: [],
  exports: [
    ProductsComponent,ProductsSearchComponent
  ]
})
export class ProductsModule { }
