import { Component ,OnInit,OnDestroy} from '@angular/core';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { CardService, CartItem } from 'projects/orders/src/public-api';

@Component({
  selector: 'lib-product-page',
  templateUrl: './product-page.component.html'
})
export class ProductPageComponent implements OnInit,OnDestroy{
  product: Product;
  endSubs$: Subject<any> = new Subject();
  quantity = 1;

  constructor(private prodService: ProductsService,
     private route: ActivatedRoute,
     private cartService: CardService
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params._id) {
        this._getProduct(params._id);
      }
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next;
    this.endSubs$.complete();
  }

  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    };

    this.cartService.setCartItem(cartItem);
  }

  private _getProduct(_id: string) {
    this.prodService
      .getProduct(_id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((resProduct) => {
        this.product = resProduct;
      });
  }

}
