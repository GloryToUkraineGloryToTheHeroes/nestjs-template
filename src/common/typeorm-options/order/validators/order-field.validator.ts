import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as Joi from 'joi';

import { TransformedOrder } from '../../../types';
import { Order } from '../order.constant';

@ValidatorConstraint({ name: 'OrderField', async: true })
@Injectable()
export class OrderFieldValidator implements ValidatorConstraintInterface {
  async validate(field: string, { constraints, value }: ValidationArguments) {
    const validationSchema: Joi.ObjectSchema<TransformedOrder> = Joi.object(
      constraints.reduce((acc, field) => ({ ...acc, [field]: Joi.string().valid(...Object.values(Order)) }), {}),
    );

    const { error } = validationSchema.validate(value);

    if (error) {
      throw new BadRequestException(error.message);
    }

    return true;
  }
}
