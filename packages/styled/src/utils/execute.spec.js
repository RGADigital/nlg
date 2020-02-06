// @flow

import { execute } from './execute';

describe('execute', () => {
  it('should return values directly', () => {
    expect(execute('this')).toEqual(['this']);
    expect(execute(['this'])).toEqual(['this']);
    expect(execute([])).toEqual([]);
  });
  it('should return getter values', () => {
    expect(execute((): string => 'this')).toEqual(['this']);
    expect(execute((): string[] => ['this'])).toEqual(['this']);
  });
  it('should use props properly', () => {
    expect(execute(
      ({ props: { name } }): string => name,
      { props: { name: 'this' } },
    )).toEqual(['this']);
    expect(execute(
      ({ props: { name } }): string[] => name,
      { props: { name: ['this'] } },
    )).toEqual(['this']);
  });
  it('should use props and styler properly', () => {
    expect(execute(
      ({ props: { name }, styler: { red } }) => red(name),
      {
        props: { name: 'this' },
        styler: { red: (value) => `red ${value}` },
      },
    )).toEqual(['red this']);
  });
});
