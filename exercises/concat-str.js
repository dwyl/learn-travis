'use strict'

/*
 * Create a function `concatStr` that takes 2 arguments and concatenate them
 *
 * @notions Functions, Operators
 */

// Your code :

const concatStr = (arr1, arr2) => {

		 return (arr1 + arr2)
}

//* Begin of tests
const assert = require('assert')

assert.strictEqual(typeof concatStr, 'function', 'Should be a function')
assert.strictEqual(concatStr.length, 2, 'Should takes 2 arguments')
assert.strictEqual(concatStr('a', 'b'), 'ab')
assert.strictEqual(concatStr('yolo', 'swag'), 'yoloswag')
// End of tests */
