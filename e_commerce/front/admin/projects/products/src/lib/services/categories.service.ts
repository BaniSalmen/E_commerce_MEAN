import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Category } from '../models/category';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http : HttpClient) { }

  getcategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/v1/categories')
  }
  getCategory(_id: string): Observable<Category> {
    return this.http.get<Category>(`http://localhost:3000/api/v1/categories/${_id}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:3000/api/v1/categories',category)
  }


  CreateCategorie(category :Category):Observable<Category> {
    return this.http.post<Category>('http://localhost:3000/api/v1/categories',category)
  }
  deleteCategory(_id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/v1/categories/${_id}`);
  }
}
