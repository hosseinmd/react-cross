export function safeCall(func, fallback) {
  try {
    return func();
  } catch {
    return fallback;
  }
}

export function arrayPad(array, length, value, augment) {
  let total, method;

  if (!Array.isArray(array)) {
    throw new TypeError("must be an array");
  }

  array = augment ? array : array.slice(0);
  method = length < 0 ? "unshift" : "push";
  total = Math.abs(length);

  if (typeof length !== "number" || total % 1 !== 0) {
    throw new TypeError("length must be an integer");
  }

  while (array.length < total) {
    array[method](value);
  }

  return array;
}

export function arraySplit(array, jump, callback) {
  const list = [];

  for (let index = 0; index < array.length; index = index + jump) {
    list.push(callback(array.slice(index, index + jump), index));
  }
  return list;
}
