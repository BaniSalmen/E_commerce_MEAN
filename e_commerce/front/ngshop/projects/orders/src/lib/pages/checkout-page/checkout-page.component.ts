import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '../../models/order';
import { Cart } from '../../models/cart';
import { CardService } from '../../services/card.service';
import { OrdersService } from '../../services/orders.service';
import { OrderItem } from '../../models/order-item';
import { UsersService } from 'projects/users/src/lib/services/users.service';
import { ORDER_STATUS } from '../../order.constants';
import { LocalstorageService } from 'projects/users/src/lib/services/localstorage.service';

@Component({
  selector: 'lib-checkout-page',
  templateUrl: './checkout-page.component.html'
})
export class CheckoutPageComponent implements OnInit{
  
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  countries = [];
  userId = '640cb5c5f7bb6245f4c0f8fe';
  
  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService: CardService,
    private ordersService: OrdersService,
  ) { 

  }


  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
  }

  backToCart(){
    this.router.navigate(['/cart']);
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity
      };
    });
    console.log(this.orderItems);
  }


  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }


  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }
 
    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status:0 ,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.cacheOrderData(order);

    this.ordersService.createCheckoutSession(this.orderItems).subscribe(error => {
      if(error){
        console.log("error in redirect to payment")
      }
     }) 

    // this.ordersService.createOrder(order).subscribe(
    //   () => {
    //     //redirect to thank you page // payment
    //     this.cartService.emptyCart();
    //     this.router.navigate(['/success']);
    //     console.log('succefuly added')
    //   },
    //   () => {
    //     //display some message to user
    //   }
    // ); 

  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

  

}
