'use stric'

/*
 * Create the function `abs` that takes one number argument
 * and returns it's absolute value.
 * You must not just use `Math.abs`, make your own.
 * see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs
 *
 * @notions Functions, Ternary
 */

// Your code :
/*const abs = (value) => {
	if (value >= 0) 
		return value
 else (value < 0)
 	 	return - value 
 }
 */
 const abs = (value) => value >= 0 ? value : - value
//* Begin of tests
const assert = require('assert')

assert.strictEqual(typeof abs, 'function')
assert.strictEqual(abs.toString().includes('Math.abs'), false)
assert.notStrictEqual(abs, Math.abs)
assert.strictEqual(abs.length, 1)
assert.strictEqual(abs(0), 0)
assert.strictEqual(abs(-1), 1)
assert.strictEqual(abs(-13.2), 13.2)
assert.strictEqual(abs(132), 132)
// End of tests */
