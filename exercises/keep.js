'use strict'

/*
 * Create a function `keepFirst` takes a string
 * and only keep the 2 first characters
 *
 * Create a function `keepLast` takes a string
 * and only keep the 2 last characters
 *
 * Create a function `keepFirstLast` takes a string
 * and only keep 2 characters from the third character
 *
 */
const keepFirst = (value) =>{
	return value = value.slice(0, 2)
}
const keepLast = (value) =>{
	return value = value.slice(-2)
}
const keepFirstLast = (value) =>{
	return value = (value.slice(3).slice(0, 2))
}

//* Begin of tests
const assert = require('assert')
assert.strictEqual(typeof keepFirst, 'function')
assert.strictEqual(keepFirst.length, 1)
assert.deepStrictEqual(keepFirst('ABCDEXX'), 'AB')
assert.deepStrictEqual(keepFirst('123456XX'), '12')
assert.strictEqual(typeof keepLast, 'function')
assert.strictEqual(keepLast.length, 1)
assert.deepStrictEqual(keepLast('XXABCDEFG'), 'FG')
assert.deepStrictEqual(keepLast('XX123456'), '56')
assert.strictEqual(typeof keepFirstLast, 'function')
assert.strictEqual(keepFirstLast.length, 1)
assert.deepStrictEqual(keepFirstLast('XXXABCDEFGXX'), 'AB')
assert.deepStrictEqual(keepFirstLast('XXX123456XX'), '12')


// End of tests */
