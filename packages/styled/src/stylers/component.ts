import styledString from './string';
import executeGetter from '../utils/execute';
import isExecutable from '../utils/isExecutable';
import combineStyled from '../utils/combine';

import {
  ValidStyleType,
  ITemplateImplementation,
  TeplateArgsWithFunc,
  TemplateArgsWithoutFunc,
  IStringTemplate,
  StylesMap,
} from '../types';

export type AppliedStyles<S extends StylesMap> = {
  [key in keyof S]: IStringTemplate
};
export type ApplyStyles<
  S extends StylesMap,
> = {
  apply(style: keyof S): IStringTemplate;
};
export type ITemplateInterface<
  S extends StylesMap
> = {
  (
    strings: TemplateStringsArray,
    ...values: TemplateArgsWithoutFunc[]
  ): string[];
  (
    strings: TemplateStringsArray,
    ...values: TeplateArgsWithFunc[]
  ): ITemplateImplementation;
} & ApplyStyles<S> & AppliedStyles<S>;

export const component = <
  S extends StylesMap,
>(styles: S): ITemplateInterface<S> => {
  const apply = (style: keyof S) => styledString(styles[style]);

  const stylesKeys = Object.keys(styles);
  const stylesMap = stylesKeys
    .reduce((prev, style) => ({
      ...prev,
      [style]: apply(style),
    }), {});

  function template(
    strings: TemplateStringsArray,
    ...values: TeplateArgsWithFunc[]
  ): ITemplateImplementation;

  function template(
    strings: TemplateStringsArray,
    ...values: TemplateArgsWithoutFunc[]
  ): string[];

  function template(
    strings: TemplateStringsArray,
    ...values: (TeplateArgsWithFunc | TemplateArgsWithoutFunc)[]
  ): ITemplateImplementation | string[] {
    const exec: ITemplateImplementation = (props) => {
      const acc: ValidStyleType[] = [[strings[0]]];
      values.forEach((value, index) => {
        acc.push(
          executeGetter(value, { props: props || {}, styler: stylesMap }),
          [strings[index + 1]],
        );
      });
      return combineStyled(...acc);
    };
    if (isExecutable(values)) {
      return exec;
    }
    return exec();
  }

  Object.defineProperty(template, 'apply', { get: () => apply });
  Object.entries(stylesMap).forEach(([key, value]) => {
    Object.defineProperty(template, key, { get: () => value });
  });

  return template;
};

export default component;
