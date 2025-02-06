// ==UserScript==
// @name         Github File Content Search
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Inserts a search bar on PR reviews that lets you filter files based on their contents
// @author       You
// @match        https://github.com/*/files
// @require      https://gist.githubusercontent.com/kitsune7/cd317ed0bda4e96b81febaf11b188d6d/raw/685a67ba681e9914a7e1a3ca52b7d4fc42077c39/monkey-utils.js
// @grant        none
// ==/UserScript==

(function () {
  // TODO: Add advanced options like case-insensitive search, regex, added lines/removed lines only, file type filter, etc.
  const searchBarContainerId = 'string-filter-searchbar';
  const diffContainerSelector = '.js-diff-progressive-container';
  const searchSvg =
    '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-search subnav-search-icon"><path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path></svg>';

  setReadyHandler(diffContainerSelector, (targetElement) => {
    if (document.getElementById(searchBarContainerId) === null) {
      const searchContainer = document.createElement('div');
      searchContainer.id = searchBarContainerId;
      searchContainer.style.marginBottom = '10px';
      searchContainer.style.width = '100%';
      searchContainer.style.position = 'relative';

      const message = document.createElement('p');
      message.style.fontSize = '0.75em';
      message.style.marginTop = '2px';
      message.style.color = 'var(--fgColor-muted)';
      // TODO: show how many files are currently being filtered
      message.textContent = "This won't filter files where the diff is hidden";

      const searchBar = document.createElement('input');
      searchBar.type = 'text';
      searchBar.placeholder = 'Search file contents...';
      searchBar.classList.add('form-control', 'input-block', 'pl-5', 'js-filterable-field');

      searchContainer.innerHTML = searchSvg;
      searchContainer.appendChild(searchBar);
      searchContainer.appendChild(message);
      targetElement.insertBefore(searchContainer, targetElement.firstChild);

      searchBar.addEventListener(
        'input',
        debounce((event) => searchFileContents(event.target.value)),
      );
    }
  });

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  function searchFileContents(filterStr) {
    const fileElements = Array.from(document.querySelectorAll('div[data-details-container-group="file"]'));

    const resetInlineStyles = (element) => (element.style.cssText = '');

    const hideFileElement = (fileElement) => {
      fileElement.style.visibility = 'hidden';
      fileElement.style.height = '0';
      fileElement.style.marginBottom = '0';
    };

    // TODO: Use a custom class instead of inline styles to make it easier to apply and reset
    fileElements.forEach((fileElement) => {
      const isUnrendered = fileElement.querySelector('.js-diff-load-container') !== null;
      if (filterStr === '' || isUnrendered) {
        resetInlineStyles(fileElement);
        if (!isUnrendered) {
          Array.from(fileElement.querySelectorAll('.blob-code-inner.blob-code-marker')).forEach((lineElement) =>
            resetInlineStyles(lineElement),
          );
        }
        return;
      }

      const codeLineElements = Array.from(fileElement.querySelectorAll('.blob-code-inner.blob-code-marker'));
      const matchingLines = codeLineElements.filter((lineElement) => lineElement.textContent.includes(filterStr));

      if (!matchingLines.length) hideFileElement(fileElement);
      else resetInlineStyles(fileElement);

      matchingLines.forEach((lineElement) => {
        // TODO: highlight the matching text rather than just the line
        lineElement.style.outline = '2px solid rgb(255 81 0)';
      });
    });
  }
})();
