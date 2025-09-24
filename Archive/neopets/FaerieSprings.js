// ==UserScript==
// @name         Neopets - Autobuy Sticky Snowball
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Autobuy a sticky snowball after 30 minutes
// @author       Christopher Bradshaw
// @match        https://www.neopets.com/faerieland/springs.phtml*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  /* ------------------------------ Main code ------------------------------ */
  const snowball = document.querySelector('img[src="http://images.neopets.com/items/snowball_8.gif"]');
  const shopButton = document.querySelector('input[value="See what is for sale"]');

  if (shopButton) {
    const thirtyMinutesInMilliseconds = 1800000;
    const paddingTime = 3000;
    setTimeout(() => {
      shopButton.click();
    }, thirtyMinutesInMilliseconds + paddingTime);
    console.log('Started timer for 30 minutes.');
  } else if (snowball) {
    snowball.click();
  } else {
    window.location = 'https://www.neopets.com/faerieland/springs.phtml';
  }
})();
