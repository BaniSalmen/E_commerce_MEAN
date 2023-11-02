import { User } from 'projects/users/src/lib/models/user';
import { OrderItem } from './order-item';

export class Order {
  id(arg0: { status: any; }, id: any) {
    throw new Error('Method not implemented.');
  }
  _id?: string;
  orderItems?: OrderItem;
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: string;
  totalPrice?: number;
  user: User;
  dateOrdered?: string;
}
