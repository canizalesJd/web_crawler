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

export { normalizeURL, getURLsFromHTML };
