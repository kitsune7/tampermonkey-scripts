// ==UserScript==
// @name         Neopets - ShopWizard
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Makes it easier to use the shop wizard
// @author       Christopher Bradshaw
// @match        https://www.neopets.com/market.phtml*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  /* ------------------------------ Main code ------------------------------ */
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type');
  const q = urlParams.get('q');

  if (type) {
    document.querySelector('select[name="criteria"]').value = 'exact';
    if (q) {
      document.querySelector('input[name="shopwizard"]').value = q;
      document.querySelector('input[value="Search"]').click();
    }
  } else {
    addControls();
  }

  function addControls() {
    const parentNode = document.querySelector('.content div:last-of-type');
    const neighborNode = document.querySelector('.content div:last-of-type table[width="600"]');

    const input = document.createElement('input');
    const button = document.createElement('button');
    const label = document.createTextNode('Search');

    input.setAttribute('id', 'customSearch');
    input.setAttribute('type', 'input');
    input.setAttribute(
      'style',
      `
      display: inline-block;
      font-size: 1.2em;
      margin-left: 18px;
      margin-bottom: 1em;
      padding: .5em;
      width: 507px;
    `,
    );
    input.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        search();
      }
    });

    button.appendChild(label);
    button.setAttribute(
      'style',
      `
      background: dodgerblue;
      border: 0;
      color: #fff;
      font-size: 1.2em;
      padding: .65em;
      width: 75px;
    `,
    );
    button.addEventListener('click', search);

    parentNode.insertBefore(input, neighborNode);
    parentNode.insertBefore(button, neighborNode);
  }

  function search() {
    const q = document.getElementById('customSearch').value;
    window.location = `https://www.neopets.com/market.phtml?type=wizard&q=${q}`;
  }
})();
