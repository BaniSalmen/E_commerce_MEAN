import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  getProducts(categoriesFilter?: string[]): Observable<Product[]> {
    let params = new HttpParams();
    if (categoriesFilter) {
      params = params.append('categories', categoriesFilter.join(','));
    }
    return this.http.get<Product[]>('http://localhost:3000/api/v1/products', {params : params});
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>('http://localhost:3000/api/v1/products', productData);
  }

  getProduct(_id: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/api/v1/products/${_id}`);
  }

  updateProduct(productData: FormData, _id: string): Observable<Product> {
    return this.http.put<Product>(`http://localhost:3000/api/v1/products/${_id}`, productData);
  }

  deleteProduct(_id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/v1/products/${_id}`);
  }
  getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`http://localhost:3000/api/v1/products/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:3000/api/v1/products/get/featured/${count}`);
  }

  searchProducts(searchTerm: string) {
    return this.http.get(`http://localhost:3000/api/v1/products/search?query=${searchTerm}`);
  }
}
