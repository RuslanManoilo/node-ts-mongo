import { Types } from 'mongoose';
import { isValidObjectId } from '@utils/common';
import { HttpException } from '@exceptions/httpException';

export function toMongoObjectId({ value, key }): Types.ObjectId {
  if (isValidObjectId(value)) {
    return value instanceof Types.ObjectId ? value : new Types.ObjectId(value);
  } else {
    throw new HttpException(400, `${key} is not a valid MongoId`);
  }
}

export function isValidMongoObjectId(id: string | Types.ObjectId) {
  if (!isValidObjectId(id)) {
    throw new HttpException(400, `${id} is not a valid MongoId`);
  }
}

export const prettierErrorMessage = error => {
  try {
    if (error.constraints) {
      if (error.constraints.unknownValue) {
        return `constraints:${JSON.stringify(error.constraints)}, target:${JSON.stringify(error.target)}`;
      }
      return `key:${error.property}, value:${error.value}, constraints:${JSON.stringify(error.constraints)}`;
    } else if (error.children && error.children.length > 0) {
      return error.children.map(prettierErrorMessage).join('; ');
    }
  } catch (e) {}

  return JSON.stringify(error);
};
