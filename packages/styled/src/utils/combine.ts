import { ValidStyleType } from '../types';

export const combine = (...styled: ValidStyleType[]): ValidStyleType => {
  const tpl: string = styled.reduce(
    (prev, [template]: ValidStyleType): string => `${prev}${template}`,
    '',
  );
  const styles: string[] = styled.reduce(
    (prev: string[], [, ...rest]: ValidStyleType): string[] => [...prev, ...rest],
    [],
  );
  return [tpl, ...styles];
};

export default combine;
