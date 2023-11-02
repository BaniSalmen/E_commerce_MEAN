import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:3000/api/v1/orders');
  }

  getOrder(_id: string): Observable<Order> {
    return this.http.get<Order>(`http://localhost:3000/api/v1/orders/${_id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('http://localhost:3000/api/v1/orders', order);
  }

  updateOrder(orderStaus: { status: string }, _id: string): Observable<Order> {
    return this.http.put<Order>(`http://localhost:3000/api/v1/orders/${_id}`, orderStaus);
  }

  deleteOrder(_id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/api/v1/orders/${_id}`);
  }

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`http://localhost:3000/api/v1/orders/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`http://localhost:3000/api/v1/orders/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalsales));
  }
}
