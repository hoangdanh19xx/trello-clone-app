// sort an array of objects based on another array order
export const mapOrder = (array, order, key) => {
  if (!array || !order || !key) return [];
  return array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]));
};
