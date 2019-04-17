// ==UserScript==
// @name         Neopets - Get NP from Money Tree
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto-grab Neopoints
// @author       Christopher Bradshaw
// @match        http://www.neopets.com/donations.phtml
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  /* ------------------------------ Main code ------------------------------ */
  const items = Array.from(document.querySelector('table[cellspacing="4"]').querySelectorAll('td'))
  const itemList = items.map((item, i) => {
    let text = item.querySelector('.name').innerText
    if (text.indexOf('NP') !== -1) {
      items[i].querySelector('a').click()
    }
    return text
  })
  console.log(itemList)
})()
