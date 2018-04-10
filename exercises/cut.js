'use strict'

/*
 * Create the function `cutFirst` that takes a string and remove the 2 last characters
 * Create the function `cutLast` that takes a string and remove the 2 first charcters
 * Create the function `cutFistLast` that takes a string
 * and remove the 2 first charcters and 2 last characters
 *
 */
const cutFirst = (value) =>{
	return value = value.slice(0, -2)
}

const cutLast = (value) =>{
	return value = value.slice(2)
}

const cutFistLast = (value) =>{
	return value = value.slice(2, -2)
}

//* Begin of tests
const assert = require('assert')
assert.strictEqual(typeof cutFirst, 'function')
assert.strictEqual(cutFirst.length, 1)
assert.deepStrictEqual(cutFirst('ABCDEXX'), 'ABCDE')
assert.deepStrictEqual(cutFirst('123456XX'), '123456')
assert.strictEqual(typeof cutLast, 'function')
assert.strictEqual(cutLast.length, 1)
assert.deepStrictEqual(cutLast('XXABCDEFG'), 'ABCDEFG')
assert.deepStrictEqual(cutLast('XX123456'), '123456')
assert.strictEqual(typeof cutFistLast, 'function')
assert.strictEqual(cutFistLast.length, 1)
assert.deepStrictEqual(cutFistLast('XXABCDEFGXX'), 'ABCDEFG')
assert.deepStrictEqual(cutFistLast('XX123456XX'), '123456')
// End of tests */
