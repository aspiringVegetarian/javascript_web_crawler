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

test('empty string', () => {
    expect(normalizeURL('')).toBe(
        ''
    )
});

test('not a valid url', () => {
    expect(normalizeURL('hello there')).toBe(
        ''
    )
});

test('capitals in host name', () => {
    expect(normalizeURL('https://BLOG.BooT.deV/path')).toBe(
        'blog.boot.dev/path'
    )
});