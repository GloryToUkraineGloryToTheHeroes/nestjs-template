import { FindOptionsSelect } from 'typeorm/find-options/FindOptionsSelect';
import { TransformFnParams } from 'class-transformer/types/interfaces';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { ApiProperty } from '@nestjs/swagger';

export function SelectOptions<T>() {
  class SelectOptionsDto {
    @ApiProperty({
      type: [String],
      required: false,
    })
    @IsNotEmpty({ each: true })
    @Type(() => String)
    @Transform(({ value }: TransformFnParams) => {
      const selects = Array.isArray(value) ? value : [value];

      const parsedQuery: Record<string, unknown> = {};

      selects.forEach((parameter) => {
        const keys = parameter.split('.');

        let currentLevel: Record<string, unknown> = parsedQuery;

        keys.forEach((nestedKey, index) => {
          if (index === keys.length - 1 && typeof currentLevel !== 'boolean') {
            currentLevel[nestedKey] = true;
          } else if (typeof currentLevel !== 'boolean') {
            currentLevel[nestedKey] = currentLevel[nestedKey] || { id: true };
            currentLevel = currentLevel[nestedKey] as Record<string, unknown>;
          }
        });
      });

      return parsedQuery;
    })
    @IsOptional()
    select?: FindOptionsSelect<T>;
  }

  return SelectOptionsDto;
}
