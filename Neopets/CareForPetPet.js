// ==UserScript==
// @name         Neopets - Care for petpet
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Take care of that stupid petpet...
// @author       Christopher Bradshaw
// @match        https://www.neopets.com/altador/petpet.phtml*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const bandage = 'http://images.neopets.com/altador/misc/petpet_act_a_2a605ae262.gif';
  const feed = 'http://images.neopets.com/altador/misc/petpet_act_b_ffabe6bc57.gif';
  const medicine = 'http://images.neopets.com/altador/misc/petpet_act_c_5f4438778c.gif';
  const wait = 'http://images.neopets.com/altador/misc/petpet_act_d_42b934a33b.gif';
  const imgSrc = document.querySelector('div[align] img').src;
  const thirtySeconds = 57000;

  switch (imgSrc) {
    case feed:
      console.log('Selected feed');
      setTimeout(() => {
        document.querySelectorAll('.content a')[0].click();
      }, thirtySeconds);
      break;
    case bandage:
      console.log('Selected bandage');
      setTimeout(() => {
        document.querySelectorAll('.content a')[1].click();
      }, thirtySeconds);
      break;
    case medicine:
      console.log('Selected medicine');
      setTimeout(() => {
        document.querySelectorAll('.content a')[2].click();
      }, thirtySeconds);
      break;
    case wait:
      console.log('Selected wait');
      setTimeout(() => {
        document.querySelectorAll('.content a')[3].click();
      }, thirtySeconds);
      break;
    default:
      console.log('Did... I do it???');
  }
})();
