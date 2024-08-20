import { JSDOM } from 'jsdom';

const normalizeURL = (url) => {
    const parsedUrl = new URL(url);
    const { host, pathname } = parsedUrl;
    const formatedPath = pathname.replace(/^\/|\/$/g, '');
    const normalizedUrl = `${host}/${formatedPath}`;
    return normalizedUrl;
};

const getURLsFromHTML = (html, baseURL) => {
    const urls = [];
    const dom = new JSDOM(html);
    const anchors = dom.window.document.querySelectorAll('a');

    for (const anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            let href = anchor.getAttribute('href');

            try {
                href = new URL(href, baseURL).href;
                urls.push(href);
            } catch (err) {
                console.log(`${err.message}: ${href}`);
            }
        }
    }
    return urls;
};

const crawlPage = async (currentURL) => {
    // fetch and parse the html of the currentURL
    console.log(`crawling ${currentURL}`);

    let res;
    try {
        res = await fetch(currentURL);
    } catch (err) {
        throw new Error(`Got Network error: ${err.message}`);
    }

    if (res.status > 399) {
        console.log(`Got HTTP error: ${res.status} ${res.statusText}`);
        return;
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`Got non-HTML response: ${contentType}`);
        return;
    }

    console.log(await res.text());
};

export { normalizeURL, getURLsFromHTML, crawlPage };
