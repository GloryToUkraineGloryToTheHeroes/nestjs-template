import { TransformFnParams } from 'class-transformer/types/interfaces';

import { TransformedOrder } from '../types';

/**
 * This will map value to array
 * @param TransformFnParams
 * @returns unknown[]
 */
export const toArray = ({ value }: TransformFnParams) => {
  return Array.isArray(value) ? value : [value];
};

/**
 * This will map value to array
 * @returns TransformedOrder
 * @param validFields
 */
export const toOrder = ({ value }: TransformFnParams): TransformedOrder => {
  const [field, order] = value.split(':');

  return { [field]: order };
};

/**
 * This will map value to UpperCase
 * @returns TransformedOrder
 * @param validFields
 */
export const toUpperCaseValue = ({ value }: TransformFnParams): TransformedOrder => {
  return Array.isArray(value) ? value.map((el: string) => el.toUpperCase()) : value.toUpperCase();
};

/**
 * This will map value to LowerCase
 * @returns TransformedOrder
 * @param validFields
 */
export const toLowerCaseValue = ({ value }: TransformFnParams): TransformedOrder => {
  return Array.isArray(value) ? value.map((el: string) => el.toUpperCase()) : value.toLowerCase();
};

/**
 * This will transform value to boolean
 * @returns TransformedOrder
 * @param validFields
 */
export const toBoolean = ({ value }: TransformFnParams): boolean => {
  return value === 'true' || value === true;
};
