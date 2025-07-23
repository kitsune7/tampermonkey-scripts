// ==UserScript==
// @name         Google Search Auto-Redirect
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically navigate to the first relevant result in some scenarios
// @match        https://www.google.com/search?*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('q') ?? '';

  const redirects = [
    { searchPrefix: 'npm', domain: 'https://www.npmjs.com/' },
    { searchPrefix: 'mdn', domain: 'https://developer.mozilla.org/' },
    { searchPrefix: 'github', domain: 'https://github.com/' },
    { searchPrefix: 'gh', domain: 'https://github.com/' },
    { searchPrefix: 'go', domain: 'https://pkg.go.dev/' },
    { searchPrefix: 'py', domain: 'https://pypi.org/' },
  ];

  const shortestPrefix = Math.min(...redirects.map((redirect) => redirect.searchPrefix.length));
  if (query.startsWith('!') && query.length > 1 + shortestPrefix) {
    const matchingRedirect = redirects.find((redirect) => query.slice(1).startsWith(redirect.searchPrefix));
    if (!matchingRedirect) return;

    const links = Array.from(document.querySelectorAll('a[href]'))
      .map((link) => link.href)
      .filter((url) => url.startsWith(matchingRedirect.domain));
    if (links.length) {
      window.location = links[0];
    }
  }
})();
