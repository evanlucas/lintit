'use strict'

const test = require('tap').test
const lintit = require('../')

test('lintFiles', (t) => {
  t.plan(3)
  lintit.lintFiles([], { cwd: 'bin' }, (err, result) => {
    t.error(err, 'no error')
    t.type(result, Object)
    t.equal(result.errorCount, 0)
  })
})

test('lintText', (t) => {
  t.plan(3)
  lintit.lintText('\'use strict\'; console.log("hi")\n', (err, result) => {
    t.error(err, 'no error while linting')
    t.type(result, Object)
    t.equal(result.warningCount, 1, 'should have used single quotes')
  })
})

test('lint normal line length, 100 characters', (t) => {
  lintit.lintText(`'use strict'\n'${'a'.repeat(98)}'\n`, (err, result) => {
      t.plan(3)
      t.error(err, 'no error while linting')
      t.type(result, Object)
      t.equal(result.errorCount, 0)
  })
})

test('lint long line length, 101 characters', (t) => {
  lintit.lintText(`'use strict'\n'${'a'.repeat(99)}'\n`, (err, result) => {
      t.plan(4)
      t.error(err, 'no error while linting')
      t.type(result, Object)
      t.equal(result.errorCount, 1)

      var errorMessage = result.results[0].messages[0].message
      t.equal(errorMessage, 'Line 2 exceeds the maximum line length of 100.')
  })
})
