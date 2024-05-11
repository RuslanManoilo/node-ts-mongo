import { Types } from 'mongoose';

export function isValidObjectId(id: string | Types.ObjectId): boolean {
  if (Types.ObjectId.isValid(id)) {
    return String(new Types.ObjectId(id)) === String(id);
  }
  return false;
}
