import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  ValidateNested,
  ArrayMinSize,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsObject,
  IsDate,
  IsArray,
} from 'class-validator';

import { ContactRelationEnum, OrderFields } from '../constants/contact.enum';
import { TypeormOptions } from '../../../common/typeorm-options';
import { toArray } from '../../../common/mappers';
import { Contact } from '../entities';

const { Options } = new TypeormOptions<Contact, ContactRelationEnum[]>({
  relationFields: Object.values(ContactRelationEnum),
  orderFields: OrderFields,
});

export class GetContactsByFiltersDto extends Options {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  @Transform(toArray)
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    required: false,
  })
  firstName?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  @Transform(toArray)
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    required: false,
  })
  lastName?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  @Transform(toArray)
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    required: false,
  })
  email?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  @Transform(toArray)
  @IsString({ each: true })
  @ApiProperty({
    type: [String],
    required: false,
  })
  phone?: string[];

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ type: Boolean, required: false })
  @Transform(({ value }) => value === 'true' || value === true)
  isPrimary?: boolean;

  @IsOptional()
  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => GetBranchesByFiltersDto)
  branch?: GetBranchesByFiltersDto;

  @IsOptional()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => GetOrdersByFiltersDto)
  @Expose({ name: 'order', toPlainOnly: true })
  orders?: GetOrdersByFiltersDto;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: false })
  createdAtMin?: string;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: false })
  createdAtMax?: string;
}
