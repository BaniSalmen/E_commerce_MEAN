import { Component ,OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html'
})
export class CartIconComponent implements OnInit {
  cartCount = 0;
  constructor(private cartService: CardService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
    
      this.cartCount= cart?.items?.length ?? 0;
    })
  }
}
