// ==UserScript==
// @name         Close Stack Overflow Cookies Popup
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Close the cookies popup on Stack Overflow
// @author       Christopher Bradshaw
// @match        https://stackoverflow.com/*
// @require      https://bit.ly/monkey-utils
// @grant        none
// ==/UserScript==

'use strict';

(function() {
  clickWhenReady('.js-consent-banner-hide');
})();