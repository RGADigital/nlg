import { ValidStyleType, StylePair } from '../types';

export type PartialType = {
  template: string,
  styles: string[],
};

export const wrap = (
  ...parts: StylePair | StylePair[]
): ValidStyleType => {
  if (parts.length === 2
    && typeof parts[0] === 'string'
    && typeof parts[1] === 'string'
  ) {
    return [`%c${parts[0]}`, parts[1]];
  }
  const partial = (parts as StylePair[]).reduce(
    (prev: PartialType, [template, style]: StylePair): PartialType => ({
      template: `${prev.template}%c${template}`,
      styles: [...prev.styles, style],
    }),
    ({ template: '', styles: [] }),
  );
  return [partial.template, ...partial.styles];
};

export default wrap;
