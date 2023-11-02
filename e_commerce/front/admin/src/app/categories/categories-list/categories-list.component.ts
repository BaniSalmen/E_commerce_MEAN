import { Component ,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CategoriesService } from 'projects/products/src/lib/services/categories.service';
import { Category } from 'projects/products/src/public-api';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  categories : Category[] =[];
  constructor(
    private categoriesService: CategoriesService,
    private messageService :MessageService,
    private confirmationService:ConfirmationService,
    private router : Router){}

  ngOnInit(): void {
    this._getCategories();
  } 

  
  deleteCategory(_id: string){
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(_id).subscribe(
          (Response) => {
            this._getCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category is deleted!'
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category is not deleted!',
            });
          }
        );
      }
    });
  }


  updateCategory(_id: string){
    this.router.navigateByUrl(`categories/form/${_id}`)
  }

  private _getCategories(){
    this.categoriesService.getcategories().subscribe( (cats) => {
      this.categories = cats;
    });
  }

}
