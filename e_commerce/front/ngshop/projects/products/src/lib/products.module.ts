import { NgModule } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RatingModule } from 'primeng/rating';
import { GalleriaModule } from 'primeng/galleria';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from 'projects/ui/src/public-api';
import { OrdersModule } from 'projects/orders/src/public-api';



const routes : Routes =[
{path:'products' ,component:ProductsListComponent},
{path:'category/:_id' ,component:ProductsListComponent},
{path:'products/:_id' ,component:ProductPageComponent},

]

@NgModule({
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent, 
    ProductsListComponent,
     ProductPageComponent
  ],
  imports: [CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    CheckboxModule,
    FormsModule,
    RatingModule,
    GalleriaModule,
    InputNumberModule,
    UiModule,
    OrdersModule
  
  ],
  exports: [
    
    ProductsSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductPageComponent,
    ProductItemComponent
  ]
})
export class ProductsModule { }