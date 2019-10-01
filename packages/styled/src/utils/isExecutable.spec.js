import isExecutable from './isExecutable';

/** @test {isExecutable} */
describe('isExecutable', () => {
  /** @test {isExecutable} */
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
