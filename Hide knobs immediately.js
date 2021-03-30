// ==UserScript==
// @name         Hide knobs immediately
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide the Knobs/Accessibility panel in storybook when the page loads
// @author       Christopher Bradshaw
// @match        https://design.gke1-west3.wsf-prod-1.wstack.net/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const selector = 'button[title="Hide addons"]';

  function hideAddons() {
    document.querySelector(selector).click();
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
      hideAddons();
    }
  }
  const styles = `
    @keyframes nodeInserted {
      from {
        outline-color: #fff;
      }
      to {
        outline-color: #000;
      }
    }
    ${selector} {
      animation-duration: 0.01s;
      animation-name: nodeInserted;
    }
  `;

  document.addEventListener('animationstart', handleInsertEvent, false);

  if (document.querySelector(selector)) {
    hideAddons();
  }
  addStyles(styles);
})();