// ==UserScript==
// @name         Neopets - Turmaculus
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Christopher Bradshaw
// @match        http://www.neopets.com/medieval/turmaculus.phtml*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'
  const tenMinutes = 600000
  const tryAgainButton = document.querySelector('input[value="Try Again??"]')

  if (tryAgainButton) {
    tryAgainButton.click()
  } else if (document.querySelector('img[src="http://images.neopets.com/items/pet_walein.gif"]')) {
    console.log('Started turmaculus timer')
    document.querySelector('select').value = '1'
    setTimeout(() => {
      document.querySelector('input[value="Wake Up!"]').click()
    }, tenMinutes)
  }
})()
