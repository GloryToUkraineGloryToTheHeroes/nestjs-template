import { IsArray, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { RelationFieldValidator } from './validators';
import { toArray } from '../../mappers/transform.mapper';

export function RelationOptions<RF>(relationFields: RF) {
  class RelationOptionsDto {
    @ApiProperty({
      type: [String],
      required: false,
    })
    @Validate(RelationFieldValidator, relationFields)
    @IsNotEmpty({ each: true })
    @Type(() => String)
    @Transform(toArray)
    @IsOptional()
    @IsArray()
    relations?: RF;
  }

  return RelationOptionsDto;
}
