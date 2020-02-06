// @flow

import isExecutable from './isExecutable';

describe('isExecutable', () => {
  test('it should work on array', () => {
    expect(isExecutable([
      'thing',
      'another',
    ])).toBe(false);
    expect(isExecutable([
      'thing',
      () => { },
    ])).toBe(true);
    expect(isExecutable([])).toBe(false);
  });
});
