// ==UserScript==
// @name         Hide CAH Ads
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  Does some useful stuff
// @author       Christopher Bradshaw
// @match        https://allbad.cards/*
// @require      https://bit.ly/monkey-utils
// @grant        none
// ==/UserScript==

'use strict';

(function() {
  function findSnoozeButton() {
    return findElementByText('Snooze for 15 minutes')?.parentElement;
  }

  clickWhenReady('.MuiDialogActions-root button', findSnoozeButton);
})();