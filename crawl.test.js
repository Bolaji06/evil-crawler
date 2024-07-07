
const { normalizeUrl }= require('./crawl.js');
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
})
