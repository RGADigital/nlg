import { ValidStyleType } from '../types';

type ValidReturn = string | ValidStyleType;
type VoidParams = ValidReturn | ((...args: any[]) => ValidReturn);
type ArgsParams<
  T extends { props?: Object, styler?: Record<keyof T['styler'], (x: string) => ValidReturn> }
> = (t: T) => ValidReturn;

interface IExecute {
  (s: VoidParams, args?: any): ValidStyleType,
  <T>(fn: ArgsParams<T>, args: T): ValidStyleType,
}

export const execute: IExecute = <T>(
  getter: VoidParams | ArgsParams<T>,
  args: T,
): ValidStyleType => {
  let value;
  if (typeof getter === 'function') {
    value = getter(args);
  } else {
    value = getter;
  }
  if (typeof value === 'string') {
    return [value];
  }
  return (value as ValidStyleType);
};

export default execute;
