import executeGetter from '../utils/execute';
import isExecutable from '../utils/isExecutable';

import {
  ITemplateImplementation,
  TeplateArgsWithFunc,
  TemplateArgsWithoutFunc,
  ValidStyleType,
} from '../types';

export function template(
  strings: TemplateStringsArray,
  ...values: TeplateArgsWithFunc[]
): ITemplateImplementation;

export function template(
  strings: TemplateStringsArray,
  ...values: TemplateArgsWithoutFunc[]
): string[];

export function template(
  strings: TemplateStringsArray,
  ...values: (TeplateArgsWithFunc | TemplateArgsWithoutFunc)[]
): ITemplateImplementation | string[] {
  const exec: ITemplateImplementation = (props?: Object): ValidStyleType => {
    const result = [strings[0]];
    const resultStyles: string[] = [];
    values.forEach((tpl, index) => {
      const [temp, ...styles] = executeGetter(tpl, { props: (props || {}) });
      result.push(temp, strings[index + 1]);
      resultStyles.push(...styles);
    });
    return [result.join(''), ...resultStyles];
  };
  if (isExecutable(values)) {
    return exec;
  }
  return exec();
}

export default template;
