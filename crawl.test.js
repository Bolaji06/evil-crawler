
const { normalizeUrl, getURLsFromHTML }= require('./crawl.js');
const { test, expect } = require('@jest/globals');

test('normalizeUrl', () => {
    const input = 'https://bj.dev/blog';
    const output = 'bj.dev/blog';
    expect(normalizeUrl(input)).toEqual(output);
});

test('normalizeUrl strip trailing slash', () => {
    const input = 'https://bj.dev/blog/';
    const output = 'bj.dev/blog';
    expect(normalizeUrl(input)).toEqual(output);
});

test('normalizeUrl capitals', () => {
    const input = 'https://BJ.DEv/blog';
    const output = 'bj.dev/blog';
    expect(normalizeUrl(input)).toEqual(output)
})

test('normalizeUrl url protocols', () => {
    const input = 'https://bj.dev/blog';
    const output = 'bj.dev/blog';
    expect(normalizeUrl(input)).toEqual(output);
});

test('Return URL from HTML', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href='https://bj.dev/blog'>
                    BJ.dev
                </a>
            </body>
        </html>
    `
    const inputBaseUrl = 'https://bj.dev/blog'
    const output = ['https://bj.dev/blog'];
    expect(getURLsFromHTML(inputHTMLBody, inputBaseUrl)).toEqual(output);
});

test('getURLsFromHTML return relative URL', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href='https://bj.dev/blog'>
                    BJ.dev
                </a>
            </body>
        </html>
    `
    const inputBaseUrl = '/blog/'
    const output = ['https://bj.dev/blog'];
    expect(getURLsFromHTML(inputHTMLBody, inputBaseUrl)).toEqual(output)
});

test('getURLsFromHTML invalid URL', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href='invalid'>
                    BJ.dev
                </a>
            </body>
        </html>
    `
    const inputBaseUrl = 'invalid'
    const output = [];
    expect(getURLsFromHTML(inputHTMLBody, inputBaseUrl)).toEqual(output);
})


