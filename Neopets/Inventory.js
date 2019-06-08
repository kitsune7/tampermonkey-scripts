// ==UserScript==
// @name         Neopets - Manage inventory
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Manage inventory
// @author       Christopher Bradshaw
// @match        http://www.neopets.com/inventory.phtml
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  const thirtyMinutes = 1800000

  Array.from(document.querySelectorAll('table.inventory td')).map(item => {
    if (item.innerText.includes('Sticky Snowball')) {
      item.querySelector('a').click()
    }
  })

  setTimeout(() => location.reload(), thirtyMinutes)
  console.log('Started refresh timer for thirty minutes', new Date())
})()
