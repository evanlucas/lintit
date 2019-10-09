'use strict'

const test = require('tap').test
const lintit = require('../')

test('lintFiles', (t) => {
  t.plan(3)
  lintit.lintFiles(['bin/cmd.js'], {}, (err, result) => {
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
