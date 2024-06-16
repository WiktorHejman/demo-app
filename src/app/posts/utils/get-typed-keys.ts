export function getTypedKeys<T extends {}>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}
