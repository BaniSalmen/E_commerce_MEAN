import { Component ,OnDestroy,OnInit} from '@angular/core';
import { Category } from '../../models/category';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { CategoriesService } from '../../services/categories.service';


@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html'
})
export class CategoriesBannerComponent implements OnInit ,OnDestroy{
  
  categories: Category[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoriesService) {}
  ngOnDestroy(): void {
    this.endSubs$.next;
    this.endSubs$.complete();
  }
  

  ngOnInit(): void {
    this.categoriesService
      .getcategories()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

 
}
