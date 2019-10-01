import styledString from './string';

describe('styled string', () => {
  it('should render simple cases', () => {
    const styled = styledString('color: red');
    expect(typeof styled).toBe('function');

    const result = styled`awesome`;
    expect(typeof result).toBe('object');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
    expect(result).toEqual(['%cawesome%c', 'color: red', '']);
  });
  it('should render templated cases', () => {
    const styled = styledString('color: red');
    expect(typeof styled).toBe('function');

    const result = styled`awesome ${'stuff'}`;
    expect(typeof result).toBe('object');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
    expect(result).toEqual(['%cawesome stuff%c', 'color: red', '']);
  });
  it('should render as a lambda function', () => {
    const styled = styledString('color: red');
    expect(typeof styled).toBe('function');

    const tpl = ({ props: { name = 'awesome' } = {} } = {}) => styled`${name}`;
    expect(typeof tpl).toBe('function');

    let result = tpl();
    expect(typeof result).toBe('object');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
    expect(result).toEqual(['%cawesome%c', 'color: red', '']);

    result = tpl({ props: { name: 'stuff' } });
    expect(typeof result).toBe('object');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
    expect(result).toEqual(['%cstuff%c', 'color: red', '']);
  });
});
