// ==UserScript==
// @name         Hide Paypal cookies message
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Does some useful stuff
// @author       Christopher Bradshaw
// @match        https://www.paypal.com/*
// @require      https://bit.ly/monkey-utils
// @grant        none
// ==/UserScript==

'use strict';

(function() {
  clickWhenReady('#acceptAllButton');
})();