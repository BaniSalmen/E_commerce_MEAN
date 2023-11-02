import { Component,OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'lib-thank-you',
  templateUrl: './thank-you.component.html'
})
export class ThankYouComponent  implements OnInit{
  constructor(private orderservice : OrdersService ,
    private cartservice :CardService) {}
  ngOnInit(): void {
    const orderData = this.orderservice.getCachedOrderData();
    
    this.orderservice.createOrder(orderData).subscribe(()=>{
      this.cartservice.emptyCart();
      this.orderservice.removeCachedOrderData();
    })
  }

}
