import executeGetter from '../utils/execute';
import isExecutable from '../utils/isExecutable';

export default (strings, ...values) => {
  const exec = (props) => {
    const result = [strings[0]];
    const resultStyles = [];
    values.forEach((tpl, index) => {
      const [template, ...styles] = executeGetter(tpl, props || {});
      result.push(template, strings[index + 1]);
      resultStyles.push(...styles);
    });
    return [result.join(''), ...resultStyles];
  };
  if (isExecutable(values)) {
    return exec;
  }
  return exec();
};
