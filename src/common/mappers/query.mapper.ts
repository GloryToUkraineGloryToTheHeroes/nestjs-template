import { ILike, In } from 'typeorm';

export const textSearchMapper = (value: string | string[]) => {
  if (!Array.isArray(value)) {
    return ILike(`%${value.trim()}%`);
  }

  if (value.length === 1) {
    return ILike(`%${value[0].trim()}%`);
  }

  return In(value.map((el) => el.trim()));
};

export const differentTextSearchMapper = (value: string | string[]) => {
  if (!Array.isArray(value)) {
    return ILike(`%${value.trim()}%`);
  }

  // if (value.length === 1) {
  //   return ILike(`%${value[0].trim()}%`);
  // }

  return In(value.map((el) => el.trim()));
};

export const idSearchMapper = (value: number | number[]) => {
  if (!Array.isArray(value)) {
    return value;
  }

  if (value.length === 1) {
    return value[0];
  }

  return In(value);
};
