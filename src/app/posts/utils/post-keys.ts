import { Post } from '../model';
import { getTypedKeys } from './get-typed-keys';

// below, a constant is created to connect the Post interface and the postKeys array
// preventing discrepancies between the interface and the array
const postKeysElements: Record<keyof Post, Boolean> = {
  userId: true,
  id: true,
  title: true,
  body: true,
};

export const postKeys = getTypedKeys(postKeysElements);
export const defaultPostKey: keyof Post = 'title';
export const defaultPostKeyIndex = postKeys.indexOf(defaultPostKey);
