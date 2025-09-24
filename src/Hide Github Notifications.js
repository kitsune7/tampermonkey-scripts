// ==UserScript==
// @name         Hide Github Notifications
// @namespace    http://tampermonkey.net/
// @version      2025-09-24
// @description  Remove the notifications icon from the GitHub header
// @author       Christopher Bradshaw
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @require      https://bit.ly/monkey-utils
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  setReadyHandler("#AppHeader-notifications-button", (element) => {
    element.classList.remove("AppHeader-button--hasIndicator");
  });
})();
