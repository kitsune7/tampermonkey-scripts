// ==UserScript==
// @name         Neopets - Magma Pool
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Christopher Bradshaw
// @match        http://www.neopets.com/magma/pool.phtml
// @grant        none
// ==/UserScript==

(function () {
  'use strict'
  const fourAndAHalfMin = 270000
  setTimeout(checkPool, fourAndAHalfMin)

  function checkPool () {
    if (document.getElementById('poolOuter').innerHTML.indexOf("I'm sorry") !== -1) {
      location.reload()
    } else {
      console.log(new Date())
    }
  }
})()