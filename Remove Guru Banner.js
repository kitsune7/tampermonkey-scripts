// ==UserScript==
// @name         Remove Guru Banner
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove the purple banner at the top of Guru, telling me to install their extension
// @author       Christopher Bradshaw
// @match        https://app.getguru.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const bannerClass = 'ghq-HeaderExtensionBanner';

  function removeBanner() {
    document.querySelector(`.${bannerClass}`).style.display = 'none';
  }

  function addStyles(cssString) {
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';

    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = cssString;
    } else {
      styleElement.appendChild(document.createTextNode(cssString));
    }

    document.querySelector("head").appendChild(styleElement);
  }

  function handleInsertEvent (event) {
    if (event.animationName == 'nodeInserted') {
      removeBanner();
    }
  }

  const keyframeStyle = `
    @keyframes nodeInserted {
      from {
        outline-color: #fff;
      }
      to {
        outline-color: #000;
      }
    }
  `;
  const bannerStyle = `
    .${bannerClass} {
      animation-duration: 0.01s;
      animation-name: nodeInserted;
    }
  `;
  const styles = `
    ${keyframeStyle}
    ${bannerStyle}
  `;

  document.addEventListener('animationstart', handleInsertEvent, false);

  window.onload = function() {
    addStyles(styles);
  };
})();