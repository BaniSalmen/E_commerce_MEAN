import { Component ,OnInit ,OnDestroy} from '@angular/core';
import { CartItem, CartItemDetailed } from '../../models/cart';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { OrdersService } from '../../services/orders.service';


@Component({
  selector: 'lib-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent  implements OnInit ,OnDestroy{
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();
  constructor(
    private router: Router,
    private cartService: CardService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this._getCartDetails();
  }

  ngOnDestroy() {
    this.endSubs$.next;
    this.endSubs$.complete();
  }

  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(respCart =>{
      this.cartItemsDetailed=[];
      this.cartCount= respCart?.items?.length ?? 0;

      respCart.items.forEach(cartItem=>{
        this.ordersService.getProduct(cartItem.productId).subscribe((respProduct)=>{
          this.cartItemsDetailed.push({
            product:respProduct, 
            quantity:cartItem.quantity
          })

        })
      })
    })
  }

  backToShop() {
    this.router.navigate(['/products']);
  }

  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product._id);
  }

  updateCartItemQuantity(event, cartItem :CartItemDetailed) {
    this.cartService.setCartItem({
      productId : cartItem.product._id,
      quantity : event.value
    },true)
    
  }

}
