'use strict'

/*
 * Create a function `add` that takes 2 arguments and add them
 *
 * @notions Primitive and Operators, Functions
 */

// Your code :
const add = (arr1, arr2) => {
	return (arr1 + arr2)
}

//* Begin of tests
const assert = require('assert')
const rand = Math.random()

assert.strictEqual(typeof add, 'function')
assert.strictEqual(add.length, 2)
assert.strictEqual(add(2, 2), 4)
assert.strictEqual(add(rand, rand), rand + rand)
// End of tests */
