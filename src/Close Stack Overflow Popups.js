// ==UserScript==
// @name         Close Stack Overflow Popups
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Close popups on Stack Overflow/Stack Exchange
// @author       Christopher Bradshaw
// @match        https://stackoverflow.com/*
// @match        https://*.stackexchange.com/*
// @require      https://bit.ly/monkey-utils
// @grant        none
// ==/UserScript==

'use strict';

(function() {
  clickWhenReady('.js-consent-banner-hide');
  clickWhenReady('button[title="Dismiss"]');
})();