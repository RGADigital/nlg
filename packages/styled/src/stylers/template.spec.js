import template from './template';
import str from './string';

describe('template styler', () => {
  it('should work with simple cases', () => {
    const red = str('color: red');
    const tpl = template`This is ${red`awesome`}!`;
    expect(typeof tpl).toBe('object');
    expect(Array.isArray(tpl)).toBe(true);
    expect(tpl.length).toBe(3);
    expect(tpl).toEqual([
      'This is %cawesome%c!',
      'color: red',
      '',
    ]);
  });
  it('should work with functional cases', () => {
    const red = str('color: red');
    const tpl = template`This is ${({ props: { name = 'awesome' } = {} } = {}) => red`${name}`}!`;
    expect(typeof tpl).toBe('function');
    const awesomeResult = tpl();
    expect(typeof awesomeResult).toBe('object');
    expect(awesomeResult.length).toBe(3);
    expect(awesomeResult).toEqual([
      'This is %cawesome%c!',
      'color: red',
      '',
    ]);
  });
  it('should work with a more complex example', () => {
    const redStyler = str('color: red');
    const blueStyler = str('color: blue');
    const quantifierGetter = ({
      props: {
        quantifier,
        styler: { blue },
      },
    }) => blue`${quantifier}`;
    const objectGetter = ({
      props: {
        object,
        styler: { red },
      },
    }) => red`${object}`;
    const testCase = {
      quantifier: 'so',
      object: 'awesome',
    };
    const styler = {
      red: redStyler,
      blue: blueStyler,
    };
    const tpl = template`This is ${quantifierGetter} ${objectGetter}!`;
    expect(typeof tpl).toBe('function');
    const awesomeResult = tpl({ ...testCase, styler });
    expect(typeof awesomeResult).toBe('object');
    expect(awesomeResult.length).toBe(5);
    expect(awesomeResult).toEqual([
      'This is %cso%c %cawesome%c!',
      'color: blue',
      '',
      'color: red',
      '',
    ]);
  });
});
