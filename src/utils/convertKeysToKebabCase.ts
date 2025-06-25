export const convertKeysToKebabCase = (
  obj: Record<string, any>,
): Record<string, any> => {
  const newObj: Record<string, any> = {};
  Object.entries(obj).forEach(([key, value]) => {
    const kebabKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    newObj[kebabKey] = value;
  });
  return newObj;
};
