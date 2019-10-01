import styledString from './string';
import executeGetter from '../utils/execute';
import isExecutable from '../utils/isExecutable';
import combineStyled from '../utils/combine';

export default (styles) => {
  const apply = (style) => styledString(styles[style]);

  const stylesKeys = Object.keys(styles);
  const stylesMap = stylesKeys
    .reduce((prev, style) => ({
      ...prev,
      [style]: apply(style),
    }), {});

  const template = (strings, ...values) => {
    const exec = (props) => {
      const acc = [[strings[0]]];
      values.forEach((value, index) => {
        acc.push(
          executeGetter(value, props || {}, stylesMap),
          [strings[index + 1]],
        );
      });
      return combineStyled(...acc);
    };
    if (isExecutable(values)) {
      return exec;
    }
    return exec();
  };
  Object.defineProperty(template, 'apply', { get: () => apply });
  Object.entries(stylesMap).forEach(([key, value]) => {
    Object.defineProperty(template, key, { get: () => value });
  });

  return template;
};
