import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { DATE_DEFAULT, DATE_TYPE } from '../constants';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: DATE_TYPE, default: () => DATE_DEFAULT })
  createdAt?: Date;

  @UpdateDateColumn({ type: DATE_TYPE, default: () => DATE_DEFAULT })
  updatedAt?: Date;
}
