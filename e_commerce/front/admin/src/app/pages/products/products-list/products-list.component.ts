import { Component ,OnInit} from '@angular/core';
import { Route, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductsService } from 'projects/products/src/lib/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit{
  products =[];
  
  constructor(
    private productsService : ProductsService,
    private router : Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){}
  ngOnInit(): void {
    this._getProducts(); 
  }
  private _getProducts(){
    this.productsService.getProducts().subscribe((products)=>{
      console.log(products)
      this.products = products;
    })
  }

  updateProduct(productid: string) {
    this.router.navigateByUrl(`products/form/${productid}`);
  }

  deleteProduct(_id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(_id).subscribe(
          () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!'
            });
          }
        );
      }
    });
  }

}
