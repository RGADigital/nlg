// @flow

export type ExecuteGetterProps<P: Object = Object, S: Object = Object> = {
  props?: P,
  styler?: S,
}

export type ExecuteGetter<P: Object = Object, S: Object = Object> =
  | string
  | string[]
  | ((ExecuteGetterProps<P, S>) => string)
  | ((?ExecuteGetterProps<P, S>) => string)
  | ((ExecuteGetterProps<P, S>) => string[])
  | ((?ExecuteGetterProps<P, S>) => string[]);

export const execute = <P: Object = Object, S: Object = Object>(
  getter: ExecuteGetter<P, S>,
  getterProps: ?ExecuteGetterProps<P, S>,
): string[] => {
  let value: string | string[];
  const { props, styler } = getterProps || {};
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

export default execute;
