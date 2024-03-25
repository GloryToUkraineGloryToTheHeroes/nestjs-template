import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import * as Joi from 'joi';

@ValidatorConstraint({ name: 'RelationField', async: true })
@Injectable()
export class RelationFieldValidator implements ValidatorConstraintInterface {
  async validate(field: string, { constraints, value }: ValidationArguments) {
    const validationSchema: Joi.ArraySchema = Joi.array().items(
      ...constraints.map((validRelation) => Joi.string().valid(validRelation)),
    );

    const { error } = validationSchema.validate(value);

    if (error) {
      throw new BadRequestException(`Relation array could contain only [${constraints}]`);
    }

    return true;
  }
}
