import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { toArray } from '../../mappers';

export class BasicEntityOptionsDto {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  @Type(() => Number)
  @IsPositive({ each: true })
  @Transform(toArray)
  @ApiProperty({
    type: [Number],
    required: false,
  })
  id?: number[];
}
