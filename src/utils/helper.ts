import { isEmpty, isNil, isNull, isNaN, isUndefined } from 'lodash';

export const isNilOrEmpty = (value: any) =>
  isNil(value) ||
  isEmpty(value) ||
  isNull(value) ||
  isNaN(value) ||
  isUndefined(value);

export const isPresent = (value: any) => !isNilOrEmpty(value);
