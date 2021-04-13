// ==UserScript==
// @name         Hide knobs immediately
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide the Knobs/Accessibility panel in storybook when the page loads
// @author       Christopher Bradshaw
// @match        https://design.gke1-west3.wsf-prod-1.wstack.net/*
// @require      https://bit.ly/monkey-utils
// @grant        none
// ==/UserScript==

'use strict';

(function() {
  clickWhenReady('button[title="Hide addons"]');
})();