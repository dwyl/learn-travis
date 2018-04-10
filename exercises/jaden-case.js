'use strict'

/*
 * Jaden Smith Case
 *
 * Make a function `jadenCase` that takes a String
 * and return capitalize each words: "How are you ?" -> "How Are You ?"
 *
 */
const jadenCase = (str) => {

str = str.toLowerCase().split(' ')
  
for (let i = 0; i < str.length; i++) {

  str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)

}
return str.join(' ');
}




//* Begin of tests
const assert = require('assert')
assert.strictEqual(typeof jadenCase, 'function')
assert.strictEqual(jadenCase.length, 1)
assert.deepStrictEqual(jadenCase('how are you'), 'How Are You')
assert.deepStrictEqual(jadenCase('my name is frederic'), 'My Name Is Frederic')
// End of tests */
