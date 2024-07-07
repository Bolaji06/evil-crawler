const { contentType } = require("express/lib/response");
const { JSDOM } = require("jsdom");

/**
 *
 * @param {String} currentPage
 */
async function crawlPage(baseUrl, currentPage, pages) {
  const baseUrlObj = new URL(baseUrl);
  const currentUrl = new URL(currentPage);

  if (baseUrlObj.hostname !== currentUrl.hostname) {
    return pages;
  }
  const normalizeCurrentUrl = normalizeUrl(currentUrl);
  if (pages[normalizeCurrentUrl] > 0) {
    pages[normalizeCurrentUrl]++;
    return pages;
  }

  pages[normalizeCurrentUrl] = 1;
  try {
    console.log("actively crawling " + currentPage);
    if (currentUrl) {
      const response = await fetch(currentUrl);
      if (response.status > 399) {
        console.log(
          `Error: crawling ${currentUrl} due to status code ${response.status}`
        );
        return;
      }
      const responseType = response.headers.get("Content-Type");
      if (!responseType.includes("text/html")) {
        console.log(`page not an html file ${currentPage} is ${contentType}`);
        return;
      }
      const htmlBody = await response.text();

      const nextUrls = getURLsFromHTML(htmlBody, baseUrl);

      for (let nextUrl of nextUrls) {
        pages = await crawlPage(baseUrl, nextUrl, pages);
      }
    }
  } catch (err) {
    console.log(`Error fetching: ${currentPage}. ${err.message}`);
  }
  return pages;
}

/**
 *
 * @param {String} htmlBody
 * @param {String} baseUrl
 * @returns Array String
 * @description get urls fromHTML
 */
function getURLsFromHTML(htmlBody, baseUrl) {
  const jsDom = new JSDOM(htmlBody);
  const urls = [];
  const linkElements = jsDom.window.document.querySelectorAll("a");
  for (let url of linkElements) {
    if (url.href.slice(0, 1) === "/") {
      // relative
      const relative = `${baseUrl}${url.href}`;

      try {
        const urlObj = new URL(relative);
        if (urlObj) {
          urls.push(`${baseUrl}${url.href}`);
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      //absolute url
      try {
        const objUrl = new URL(url.href);
        if (objUrl) {
          urls.push(url.href);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  }
  return urls;
}

/**
 *
 * @param {String} urlString
 * @returns urlString
 * @description normalize the url string
 */
function normalizeUrl(urlString) {
  const newUrl = new URL(urlString);
  const hostPath = `${newUrl.hostname}${newUrl.pathname}`;
  if (hostPath.length && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeUrl,
  getURLsFromHTML,
  crawlPage,
};
