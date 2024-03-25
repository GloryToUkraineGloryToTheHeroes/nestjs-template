import { Order } from '../typeorm-options';

export interface TransformedOrder {
  [field: string]: Order;
}
