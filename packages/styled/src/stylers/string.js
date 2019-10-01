import wrapStyled from '../utils/wrap';

export default (style) => (
  strings,
  ...values
) => {
  const template = [strings[0]];
  values.forEach((value, index) => template.push(value, strings[index + 1]));
  return wrapStyled([template.join(''), style], ['', '']);
};
