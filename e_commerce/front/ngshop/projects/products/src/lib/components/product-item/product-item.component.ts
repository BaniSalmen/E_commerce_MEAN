import { Component , Input, OnInit} from '@angular/core';
import { Product } from '../../models/product';
import { CardService, CartItem } from 'projects/orders/src/public-api';

@Component({
  selector: 'products-product-item',
  templateUrl: './product-item.component.html'
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  constructor(private cartService :CardService) {}

  ngOnInit(): void {}

  addProductToCart(){
    const cartItem : CartItem ={
      productId : this.product.id,
      quantity: 1
    }
    this.cartService.setCartItem(cartItem);
  }
}
