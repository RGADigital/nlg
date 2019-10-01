import styled from './index';

const styles = {
  red: 'color: red',
  blue: 'color: blue',
};

describe('dispatcher', () => {
  describe('should work with strings', () => {
    let tpl;
    let str;
    const testCase = 'Awesome';
    beforeEach(() => {
      tpl = styled(styles.red);
      str = tpl`${testCase}`;
    });
    afterEach(() => {
      tpl = null;
      str = null;
    });
    it('should create a template', () => {
      expect(tpl).toBeTruthy();
    });
    it('should construct properly', () => {
      expect(typeof tpl).toBe('function');
      expect(typeof str).toBe('object');
      expect(Array.isArray(str)).toBeTruthy();
      expect(str.length).toBe(3);
      expect(str).toEqual([
        `%c${testCase}%c`,
        styles.red,
        '',
      ]);
    });
  });

  describe('should work with templates', () => {
    let tpl;
    const testCase = ['Awesome', 'stuff'];
    const red = styled(styles.red);
    const blue = styled(styles.blue);
    beforeEach(() => {
      tpl = styled`${red`${testCase[0]}`} ${blue`${testCase[1]}`}!`;
    });
    afterEach(() => {
      tpl = null;
    });
    it('should create a template', () => {
      expect(tpl).toBeTruthy();
    });
    it('should construct properly', () => {
      expect(typeof tpl).toBe('object');
      expect(Array.isArray(tpl)).toBeTruthy();
      expect(tpl.length).toBe(5);
      expect(tpl).toEqual([
        `%c${testCase[0]}%c %c${testCase[1]}%c!`,
        styles.red,
        '',
        styles.blue,
        '',
      ]);
    });
  });

  describe('should work with components', () => {
    let tpl;
    let str;
    const testCase = { quantifier: 'Awesome', object: 'Stuff' };
    const q = ({
      props: { quantifier },
      styler: { red },
    }) => red`${quantifier}`;
    const o = ({
      props: { object },
      styler: { blue },
    }) => blue`${object}`;
    beforeEach(() => {
      tpl = styled(styles)`${q} ${o}!`;
      str = tpl(testCase);
    });
    afterEach(() => {
      tpl = null;
      str = null;
    });
    it('should create a template', () => {
      expect(tpl).toBeTruthy();
    });
    it('should construct properly', () => {
      expect(typeof tpl).toBe('function');
      expect(typeof str).toBe('object');
      expect(Array.isArray(str)).toBeTruthy();
      expect(str.length).toBe(5);
      expect(str).toEqual([
        `%c${testCase.quantifier}%c %c${testCase.object}%c!`,
        styles.red,
        '',
        styles.blue,
        '',
      ]);
    });
  });
});
