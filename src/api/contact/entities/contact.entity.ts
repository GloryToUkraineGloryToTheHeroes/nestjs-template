import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../../../common/entities';
import { Branch } from '../../branch/entities';
import { Order } from '../../order/entities';

@Entity()
export class Contact extends BaseEntity {
  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  phone: string;

  @Column({ type: 'boolean', default: false })
  isPrimary: boolean;

  @ManyToOne(() => Branch, (branch) => branch.contacts, { onDelete: 'CASCADE' })
  branch: Branch;

  @OneToMany(() => Order, (order) => order.contact)
  orders: Order[];
}
