const normalizeURL = (url) => {
    const parsedUrl = new URL(url);
    const { host, pathname } = parsedUrl;
    const formatedPath = pathname.replace(/^\/|\/$/g, '');
    const normalizedUrl = `${host}/${formatedPath}`;
    return normalizedUrl;
};

export { normalizeURL };
