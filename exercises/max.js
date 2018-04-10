'use strict'

/*
 * Create the function `max` that takes 2 number arguments
 * and returns the greatest
 * You must not just use `Math.max`, make your own.
 * see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
 *
 * @notions Functions, Ternary
 */

// Your code :

/*const max = (a, b) => {
	if (a > b)
		return a
	else return b 
}
*/
const max = (a, b) => a > b ? a : b

//* Begin of tests
const assert = require('assert')

assert.strictEqual(typeof max, 'function')
assert.strictEqual(max.length, 2)
assert.strictEqual(max.toString().includes('Math.max'), false)
assert.notStrictEqual(max, Math.max)
assert.strictEqual(max(0, -2), 0)
assert.strictEqual(max(-1, 10), 10)
assert.strictEqual(max(-13.2, -222), -13.2)
assert.strictEqual(max(132, 133), 133)
// End of tests */
