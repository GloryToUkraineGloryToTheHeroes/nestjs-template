import { BaseEntity } from '../../entities';

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export const defaultOrderFields: Array<keyof BaseEntity> = ['id', 'createdAt', 'updatedAt'];
