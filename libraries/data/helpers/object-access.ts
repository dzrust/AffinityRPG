export const getSubObjectByKey = (key: string, object?: any): any => {
  if (object === null || object === undefined) return object;
  const keys = key.split(".");
  if (keys.length > 1) {
    return getSubObjectByKey(keys.filter((_, index) => index !== 0).join("."), object[keys[0]]);
  }
  return object[keys[0]];
};
