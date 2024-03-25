import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { Take } from '../pagination.constant';

export class PaginationOptionsDto {
  @ApiPropertyOptional({
    minimum: Take.MIN,
    default: Take.MIN,
  })
  @Type(() => Number)
  @IsInt()
  @Min(Take.MIN)
  @IsOptional()
  readonly page?: number = Take.MIN;

  @ApiPropertyOptional({
    minimum: Take.MIN,
    maximum: Take.MAX,
    default: Take.DEFAULT,
  })
  @Type(() => Number)
  @IsInt()
  @Min(Take.MIN)
  @Max(Take.MAX)
  @IsOptional()
  readonly take?: number = Take.DEFAULT;
}
