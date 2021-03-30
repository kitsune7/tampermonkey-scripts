// ==UserScript==
// @name         Transpose text (CodeMirror)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a hotkey to transpose text
// @author       Christopher Bradshaw
// @match        https://codepen.io/happikitsune/pen/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const codeMirrors = Array.from(document.querySelectorAll('.CodeMirror'));
  codeMirrors.forEach(textarea =>
    textarea.addEventListener('keydown', handleKeypress)
  );

  function handleKeypress(event) {
    if (event.getModifierState("Alt") && event.getModifierState("Shift")) {
      if (event.key === "ArrowUp") {
        transposeUp(event.target);
      } else if (event.key === "ArrowDown") {
        transposeDown(event.target);
      }
    }
  }

  function transposeUp(textarea) {
    const codeMirror = textarea.closest('.CodeMirror')?.CodeMirror;
    if (!codeMirror || codeMirror.getCursor().line === 0) return;

    const codeLines = codeMirror.getValue().split('\n');
    const { ch, line, sticky } = codeMirror.getCursor();
    const newCodeLines = [
      ...codeLines.slice(0, line - 1),
      codeLines[line],
      codeLines[line - 1],
      ...codeLines.slice(line + 1)
    ];

    codeMirror.setValue(newCodeLines.join('\n'));
    codeMirror.setCursor({ ch, line: line - 1 });
  }

  function transposeDown(textarea) {
    const codeMirror = textarea.closest('.CodeMirror')?.CodeMirror;
    if (!codeMirror || codeMirror.getCursor().line === codeMirror.getValue().split('\n').length - 1) return;

    const codeLines = codeMirror.getValue().split('\n');
    const { ch, line, sticky } = codeMirror.getCursor();
    const newCodeLines = [
      ...codeLines.slice(0, line),
      codeLines[line + 1],
      codeLines[line],
      ...codeLines.slice(line + 2)
    ];

    codeMirror.setValue(newCodeLines.join('\n'));
    codeMirror.setCursor({ ch, line: line + 1 });
  }
})();