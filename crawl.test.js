const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

test('strips protocol', () => {
    expect(normalizeURL('https://blog.boot.dev/path')).toBe(
        'blog.boot.dev/path'
    )
});

test('strips protocol and trailing forward slash', () => {
    expect(normalizeURL('http://blog.boot.dev/path/')).toBe(
        'blog.boot.dev/path'
    )
});

test('strips protocol and multiple trailing forward slash', () => {
    expect(normalizeURL('http://blog.boot.dev/path//')).toBe(
        'blog.boot.dev/path'
    )
});