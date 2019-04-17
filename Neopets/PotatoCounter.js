// ==UserScript==
// @name         Neopets - Potato Counter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto count the potatoes
// @author       Christopher Bradshaw
// @match        http://www.neopets.com/medieval/potatocounter.phtml
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  /* ------------------------------ Main code ------------------------------ */
  const guessInput = document.querySelector('input[name="guess"]')
  guessInput.value = document.querySelectorAll('.content tbody img').length
})()
