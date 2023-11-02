import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';
import { StripeService } from 'ngx-stripe';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient , private stripeService : StripeService
    ) {}

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

 
  getProduct(_id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/v1/products/${_id}`);
  }


  createCheckoutSession(orderItem :OrderItem[]){
    return this.http.post(`http://localhost:3000/api/v1/orders/create-checkout-session`, orderItem)
    .pipe(switchMap((session : {id : string})=>{
         return this.stripeService.redirectToCheckout({sessionId: session.id})
    }))
    
  }

  cacheOrderData(order : Order){
    localStorage.setItem("OrderData", JSON.stringify(order))
  }

  getCachedOrderData():Order{
    return JSON.parse(localStorage.getItem("OrderData"));
  }

  removeCachedOrderData(){
    localStorage.removeItem("OrderData")
  }

}


