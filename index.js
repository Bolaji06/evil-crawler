
const { normalizeUrl, getURLsFromHTML } = require('./crawl');

const inputHTMLBody = `
<html>
    <body>
        <a href='https://bj.dev/blog>
            BJ.dev
        </a>
    </body>
</html>
`
getURLsFromHTML(inputHTMLBody, "");
