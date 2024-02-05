const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')

test('sortPages', () => {
  const input = {
    'urlOne': 11,
    'urlTwo': 22,
    'urlThree': 33,
    'urlFour': 44,
    'urlFive': 55 
  }
  const actual = sortPages(input)
  const expected = [
    [ 'urlFive', 55 ],
    [ 'urlFour', 44 ],
    [ 'urlThree', 33 ],
    [ 'urlTwo', 22 ],
    [ 'urlOne', 11 ]
  ]
  expect(actual).toEqual(expected)
})

test('sortPages null case', () => {
  const input = {}
  const actual = sortPages(input)
  const expected = []
  expect(actual).toEqual(expected)
})