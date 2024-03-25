import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { OrderFieldValidator } from './validators';
import { TransformedOrder } from '../../types';
import { toOrder } from '../../mappers';

export function OrderOptions<T>(validKeys: Array<keyof T>) {
  class OrderOptionsDto {
    @ApiProperty({
      type: String,
      required: false,
      example: 'id:desc',
    })
    @IsNotEmpty()
    @Transform(toOrder)
    @IsOptional()
    @Validate(OrderFieldValidator, validKeys)
    readonly sort?: TransformedOrder;
  }

  return OrderOptionsDto;
}
