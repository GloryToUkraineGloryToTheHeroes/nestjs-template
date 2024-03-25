import { TransformFnParams } from 'class-transformer';

export const parseToArray = ({ value }: TransformFnParams): any[] => {
  if (Array.isArray(value)) {
    return value;
  }

  return [value];
};
