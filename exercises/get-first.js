'use strict'

/*
 * Create a `getFirst` function that takes an array or a string
 * and return the first element
 *
 * @notions Data-Structures, Get
 */

// Your code :

const getFirst = (arr) => arr[0]

//* Begin of tests
const assert = require('assert')

assert.strictEqual(getFirst([ 2, 42 ]), 2)
assert.strictEqual(getFirst([ 'pouet', 4, true ]), 'pouet')
assert.strictEqual(getFirst([ getFirst ]), getFirst)
assert.strictEqual(getFirst('salut'), 's')
assert.strictEqual(getFirst([]), undefined)
// End of tests */
