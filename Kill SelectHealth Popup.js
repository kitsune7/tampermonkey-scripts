// ==UserScript==
// @name         Kill SelectHealth Popup
// @namespace    http://tampermonkey.net/
// @version      2024-06-27
// @description  Fix SelectHealth's website
// @author       You
// @match        https://fssoconsumer.intermountainhealthcare.org/shmyhealthweb/dashboard
// @icon         https://www.google.com/s2/favicons?sz=64&domain=intermountainhealthcare.org
// @require      https://gist.githubusercontent.com/kitsune7/cd317ed0bda4e96b81febaf11b188d6d/raw/685a67ba681e9914a7e1a3ca52b7d4fc42077c39/monkey-utils.js
// @grant        none
// ==/UserScript==

(function () {
  setReadyHandler('.modal-backdrop', (targetElement) => targetElement.remove());
  setReadyHandler('#onboardingModal', (targetElement) => {
    targetElement.remove();
    document.body.style.overflow = 'visible';
  });
})();
