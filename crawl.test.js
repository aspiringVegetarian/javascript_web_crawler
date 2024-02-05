const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

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

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path/">
            Boot.dev Blog
        </a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.boot.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
});

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">
            Boot.dev Blog
        </a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
});

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/">
            Boot.dev Blog
        </a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
});

test('getURLsFromHTML absolute and relative', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://blog.boot.dev/path1/">
            Boot.dev Blog Full Path
        </a>
        <a href="/path2/">
            Boot.dev Blog Relative Path
        </a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
});

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="invalid">
            Boot.dev Blog Invalid
        </a>
    </body>
</html>
    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
});