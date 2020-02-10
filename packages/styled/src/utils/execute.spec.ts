import { execute } from './execute';

describe('execute', () => {
  it('should return values directly', () => {
    expect(execute('this')).toEqual(['this']);
    expect(execute(['this'])).toEqual(['this']);
  });
  it('should return getter values', () => {
    expect(execute(() => 'this')).toEqual(['this']);
    expect(execute(() => ['this'])).toEqual(['this']);
  });
  it('should use props properly', () => {
    expect(execute(
      ({ props: { name } }) => name,
      { props: { name: 'this' } },
    )).toEqual(['this']);
    expect(execute(
      ({ props: { name } }) => name,
      { props: { name: ['this'] } },
    )).toEqual(['this']);
  });
  it('should use props and styler properly', () => {
    expect(execute(
      ({ props: { name }, styler: { red } }) => red(name),
      {
        props: { name: 'this' },
        styler: { red: (value: string): string => `red ${value}` },
      },
    )).toEqual(['red this']);
  });
});
