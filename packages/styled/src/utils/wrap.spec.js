import merge from './wrap';

describe('wrap', () => {
  test('one parameter', () => {
    const testCase = ['awesome', 'color: red'];
    const combined = merge(...testCase);
    expect(combined.length).toBe(2);
    expect(combined[0]).toBe(`%c${testCase[0]}`);
    expect(combined[1]).toBe(testCase[1]);
  });
  test('multiple parameters', () => {
    const testCase = [
      ['awesome', 'color: red'],
      ['super awesome', 'color: blue'],
    ];
    const combined = merge(...testCase);
    expect(combined.length).toBe(3);
    expect(combined[0]).toBe(`%c${testCase[0][0]}%c${testCase[1][0]}`);
    expect(combined[1]).toBe(testCase[0][1]);
    expect(combined[2]).toBe(testCase[1][1]);
  });
});
