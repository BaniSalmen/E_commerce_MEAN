import { User } from 'projects/users/src/lib/models/user';
import { OrderItem } from './order-item';

export class Order {
  _id?: string;
  orderItems?: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: number;
  user: any;
  dateOrdered?: string;
}
