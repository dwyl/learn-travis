'use strict'

/*
 * Create a function `yell` that takes a string
 * and return the same string but all in upper case
 *
 */
const yell = (str) => {
	
	return str.toUpperCase()
}

//* Begin of tests
const assert = require('assert')

assert.strictEqual(typeof yell, 'function')
assert.strictEqual(yell.length, 1)
assert.deepStrictEqual(yell('a b c'), 'A B C')
assert.deepStrictEqual(yell('toto'), 'TOTO')
// End of tests */
