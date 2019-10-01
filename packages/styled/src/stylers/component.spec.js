import styled from './component';

describe('styled component', () => {
  it('should construct properly', () => {
    const styles = {
      red: 'color: red',
      blue: 'color: blue',
    };
    const component = styled(styles);
    expect(typeof component).toBe('function');
    expect(typeof component.apply).toBe('function');
    Object.keys(styles).forEach((key) => {
      const styler = component[key];
      expect(typeof styler).toBe('function');
      const result = styler`awesome`;
      expect(typeof result).toBe('object');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(3);
      expect(result).toEqual([
        '%cawesome%c',
        styles[key],
        '',
      ]);
      const applyStyler = component.apply(key);
      const applyResult = applyStyler`stuff`;
      expect(typeof applyResult).toBe('object');
      expect(Array.isArray(applyResult)).toBe(true);
      expect(applyResult.length).toBe(3);
      expect(applyResult).toEqual([
        '%cstuff%c',
        styles[key],
        '',
      ]);
    });
  });
  it('should work properly on the base case', () => {
    const styles = {
      red: 'color: red',
      blue: 'color: blue',
    };
    const component = styled(styles);
    expect(typeof component).toBe('function');
    const result = component`${component.red`Awesome`} ${component.blue`stuff`}!`;

    expect(typeof result).toBe('object');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);
    expect(result).toEqual([
      '%cAwesome%c %cstuff%c!',
      styles.red,
      '',
      styles.blue,
      '',
    ]);
  });
  it('should work properly on template call', () => {
    const styles = {
      red: 'color: red',
      blue: 'color: blue',
    };
    const testCase = {
      quantifier: 'Awesome',
      object: 'stuff',
    };
    const component = styled(styles);
    expect(typeof component).toBe('function');

    const quantifierGetter = ({
      props: {
        quantifier,
      },
    }) => component.red`${quantifier}`;
    const objectGetter = ({
      props: {
        object,
      },
    }) => component.blue`${object}`;

    const template = component`${quantifierGetter} ${objectGetter}!`;
    expect(typeof template).toBe('function');

    const result = template(testCase);
    console.log(testCase, template, result);
    expect(typeof result).toBe('object');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);
    expect(result).toEqual([
      `%c${testCase.quantifier}%c %c${testCase.object}%c!`,
      styles.red,
      '',
      styles.blue,
      '',
    ]);
  });

  it('should work properly on template call (onspot)', () => {
    const styles = {
      red: 'color: red',
      blue: 'color: blue',
    };
    const testCase = {
      quantifier: 'Awesome',
      object: 'stuff',
    };
    const component = styled(styles);
    expect(typeof component).toBe('function');

    const quantifierGetter = ({
      props: {
        quantifier,
      },
      styler: {
        red,
      },
    }) => red`${quantifier}`;
    const objectGetter = ({
      props: {
        object,
      },
      styler: {
        blue,
      },
    }) => blue`${object}`;

    const template = component`${quantifierGetter} ${objectGetter}!`;
    expect(typeof template).toBe('function');

    const result = template(testCase);
    console.log(testCase, template, result);
    expect(typeof result).toBe('object');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);
    expect(result).toEqual([
      `%c${testCase.quantifier}%c %c${testCase.object}%c!`,
      styles.red,
      '',
      styles.blue,
      '',
    ]);
  });
});
