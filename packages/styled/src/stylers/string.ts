import wrapStyled from '../utils/wrap';
import { IStringTemplate } from '../types';

export const template = (style: string): IStringTemplate => (
  strings: TemplateStringsArray,
  ...values: any[]
) => {
  const tpl = [strings[0]];
  values.forEach((value, index) => tpl.push(value, strings[index + 1]));
  return wrapStyled([tpl.join(''), style], ['', '']);
};

export default template;
