// ==UserScript==
// @name         Neopets - Auto-refresh after using Sticky Snowball
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto-refresh after using Sticky Snowball
// @author       Christopher Bradshaw
// @match        http://www.neopets.com/useobject.phtml
// @grant        none
// ==/UserScript==

(function() {
  'use strict'

  if (document.body.innerText.includes('Sticky Snowball')) {
    window.close()
    opener.refreshme()
  }
})()