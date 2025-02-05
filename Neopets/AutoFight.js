// ==UserScript==
// @name         Neopets - Add autofight button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Press the fight and skip buttons until the fight is over
// @author       Christopher Bradshaw
// @match        https://www.neopets.com/dome/arena.phtml
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  /* ------------------------------ Main code ------------------------------ */
  function autoFight() {
    setInterval(() => {
      document.getElementById('fight').click();
      setTimeout(() => document.getElementById('skipreplay').click(), 1500);
    }, 2000);
  }

  function addControls() {
    const parentNode = document.getElementById('main');
    const neighborNode = document.getElementById('content');

    const button = document.createElement('button');
    const label = document.createTextNode('Auto Fight');
    button.appendChild(label);
    button.addEventListener('click', autoFight);
    parentNode.insertBefore(button, neighborNode);
  }

  addControls();
})();
