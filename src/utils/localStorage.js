export const setLSItem = (str, object) => {
  if (typeof window !== `undefined`) {
    return window.localStorage.setItem(str, object);
  }
  return undefined;
};

export const getLSItem = str => {
  if (typeof window !== `undefined`) {
    return window.localStorage.getItem(str);
  }
  return undefined;
};

export const getNumberLSItem = str => {
  const storageItem = getLSItem(str);
  return Number(storageItem);
};
