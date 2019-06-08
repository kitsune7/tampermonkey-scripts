// ==UserScript==
// @name         Neopets - Put Sticky Snowball into my shop
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Put sticky snowball into shop
// @author       Christopher Bradshaw
// @match        http://www.neopets.com/iteminfo.phtml*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  if (document.querySelector('table').innerText.indexOf('Sticky Snowball') !== -1) {
    document.querySelector('select').value = 'stockshop'
    document.querySelector('input[type="submit"]').click()
  }
})()
