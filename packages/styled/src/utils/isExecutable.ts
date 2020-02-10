/**
 * Determine if array contains function (logger using it should become executable)
 *
 * @param {Array<any>} values The array of values to be analyzed
 * @returns {boolean} If a function has been found within the array
 * @example
 * isExecutable(['a', 'b', 'c']) // => false
 * isExecutable(['a', 'b', () => 'c']) // => true
 */
const isExecutable = (values: Function | any): boolean => values.filter(
  (it: Function | any): boolean => typeof it === 'function',
).length > 0;

export default isExecutable;
