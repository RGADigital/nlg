import { combine, ParamType } from './combine';

describe('combine', () => {
  test('basic use', () => {
    const testCase: ParamType[] = [
      ['%c awesome', 'color: red'],
      ['%c super awesome', 'color: blue'],
    ];
    const combined = combine(...testCase);
    expect(combined.length).toBe(3);
    expect(combined[0]).toBe(testCase.map((it) => it[0]).join(''));
    testCase.forEach(([, style], index) => expect(combined[index + 1]).toBe(style));
  });
  test('combined use', () => {
    const testCase: ParamType[] = [
      ['%c awesome', 'color: red'],
      ['%c super %c awesome', 'color: blue', 'color: green'],
      ['%c stuff', 'color: purple'],
    ];
    const combined = combine(...testCase);
    expect(combined.length).toBe(5);
    expect(combined[0]).toBe(testCase.map((it) => it[0]).join(''));
    expect(combined[1]).toBe(testCase[0][1]);
    expect(combined[2]).toBe(testCase[1][1]);
    expect(combined[3]).toBe(testCase[1][2]);
    expect(combined[4]).toBe(testCase[2][1]);
  });
});
