// ==UserScript==
// @name         Hide completed interviews
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add a button to the page that lets me hide completed interviews
// @author       Christopher Bradshaw
// @match        https://www.hackerrank.com/x/interviews/myinterviews
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const selector = '.interview-tour';
  const readyFn = insertButton;
  let completedInterviewNodes;

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
      readyFn();
    }
  }

  function getCompletedInterviewNodes() {
    return Array.from(document.querySelectorAll('td:nth-child(5)'))
        .filter(statusCell => statusCell.innerText.includes("To Evaluate"))
        .map(statusCell => statusCell.parentNode)
  }

  function setupNodes() {
    if (!completedInterviewNodes) {
      completedInterviewNodes = getCompletedInterviewNodes();
    }
  }

  function getHideButton() {
    return document.querySelector('.cb-hide-button');
  }

  function completedInterviewsAreHidden() {
    return completedInterviewNodes?.[0].classList.contains('cb-hidden') ?? false;
  }

  function hideCompletedInterviews(event) {
    event.preventDefault();
    setupNodes();
    const hideButton = getHideButton();
    hideButton.innerText = 'Show completed interviews';
    hideButton.onclick = showCompletedInterviews;
    if (!completedInterviewsAreHidden()) {
      completedInterviewNodes.forEach(node => {
        node.classList.add('cb-hidden')
      })
    }
  }

  function showCompletedInterviews(event) {
    event.preventDefault();
    setupNodes();
    const hideButton = getHideButton();
    hideButton.innerText = 'Hide completed interviews';
    hideButton.onclick = hideCompletedInterviews;
    if (completedInterviewsAreHidden()) {
      completedInterviewNodes.forEach(node => {
        node.classList.remove('cb-hidden')
      })
    }
  }

  function insertButton() {
    const hideButton = document.createElement('button');
    const buttonLabel = document.createTextNode('Hide completed interviews');
    hideButton.appendChild(buttonLabel);
    hideButton.onclick = hideCompletedInterviews;
    hideButton.classList.add('cb-hide-button', 'btn', 'btn-primary');
    document.querySelector(selector).appendChild(hideButton);
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
    .cb-hide-button {
      box-sizing: border-box;
      height: 37px;
      margin-left: 10px;
    }
    .cb-hidden {
      display: none;
    }
  `;

  document.addEventListener('animationstart', handleInsertEvent, false);

  if (document.querySelector(selector)) {
    readyFn();
  }
  addStyles(styles);
})();