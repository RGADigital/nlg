export default (
  getter,
  props,
  styler,
) => {
  let value;
  if (typeof getter === 'function') {
    value = getter({ props, styler });
  } else {
    value = getter;
  }
  if (typeof value === 'string') {
    return [value];
  }
  return value;
};
