// ==UserScript==
// @name         Neopets - Login
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto login to neopets
// @author       Christopher Bradshaw
// @match        https://www.neopets.com/login/index.phtml*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  /* ------------------------------ Main code ------------------------------ */
  const loginDelay = 4000;
  setTimeout(() => {
    document.querySelector('.welcomeLoginButton').click();
  }, loginDelay);
})();
