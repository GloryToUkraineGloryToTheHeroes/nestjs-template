import { IntersectionType } from '@nestjs/swagger';

import { defaultOrderFields, OrderOptions } from './order';
import { PaginationOptionsDto } from './paginations';
import { TypeormOptionsInterface } from '../types';
import { BasicEntityOptionsDto } from './basic';
import { RelationOptions } from './relations';
import { SelectOptions } from './select';
import { BaseEntity } from '../entities';

export class TypeormOptions<OF extends BaseEntity, RF> {
  options: TypeormOptionsInterface<OF, RF>;

  constructor(options: TypeormOptionsInterface<OF, RF>) {
    this.options = options;
  }

  public get Options() {
    return class TypeormOptions extends IntersectionType(
      BasicEntityOptionsDto,
      PaginationOptionsDto,
      SelectOptions<OF>(),
      OrderOptions([...defaultOrderFields, ...(this.options?.orderFields || [])]),
      RelationOptions<RF>(this.options?.relationFields),
    ) {};
  }
}
