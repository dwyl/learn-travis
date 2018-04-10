'use strict'

/*
 * Create a function `whisper` that takes a string
 * and return the same string but all in lower case
 *
 */

const whisper = (str) => {
	
	return str.toLowerCase()
}
//* Begin of tests
const assert = require('assert')

assert.strictEqual(typeof whisper, 'function')
assert.strictEqual(whisper.length, 1)
assert.deepStrictEqual(whisper('A B C'), 'a b c')
assert.deepStrictEqual(whisper('TOTO'), 'toto')

// End of tests */
