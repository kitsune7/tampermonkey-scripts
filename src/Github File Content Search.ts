// ==UserScript==
// @name         Github File Content Search
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Inserts a search bar on PR reviews that lets you filter files based on their contents
// @author       Christopher Bradshaw
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

import { addStyles, findElementByText, setReadyHandler } from './lib/monkey-utils-reference'

const customClassPrefix = 'kitsune'
const highlightClass = `${customClassPrefix}-highlight`
addStyles(`.${highlightClass} { background-color: rgb(255 81 0 / 0.5); }`)

const searchBarContainerId = 'string-filter-searchbar'

// TODO: Add advanced options like case-insensitive search, regex, added lines/removed lines only, file type filter, etc.
const legacySelectors = {
  diffContainer: '.js-diff-progressive-container',
  fileElement: 'div[data-details-container-group="file"]',
  diffLoadContainer: '.js-diff-load-container',
  codeLine: '.blob-code-inner.blob-code-marker',
}
const newSelectors = {
  diffContainer: '.prc-PageLayout-ContentWrapper-b-QRo',
  fileElement: '.Diff-module__diff--Sofy4',
  diffLoadContainer: 'div[data-diff-anchor]',
  codeLine: '.diff-text-inner',
}
let selectors = legacySelectors

const switchBackLink = findElementByText('Switch back')
if (switchBackLink instanceof HTMLAnchorElement && switchBackLink.href.endsWith('?new_files_changed=false')) {
  selectors = newSelectors
}

const searchSvg =
  '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-search subnav-search-icon"><path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path></svg>'

setReadyHandler(selectors.diffContainer, (targetElement: HTMLElement) => {
  if (document.getElementById(searchBarContainerId) === null) {
    const searchContainer = document.createElement('div')
    searchContainer.id = searchBarContainerId
    searchContainer.style.marginBottom = '10px'
    searchContainer.style.width = '100%'
    searchContainer.style.position = 'relative'

    const message = document.createElement('p')
    message.style.fontSize = '0.75em'
    message.style.marginTop = '2px'
    message.style.color = 'var(--fgColor-muted)'
    // TODO: show how many files are currently being filtered
    message.textContent = "This won't filter files where the diff is hidden"

    const searchBar = document.createElement('input')
    searchBar.type = 'text'
    searchBar.placeholder = 'Search file contents...'
    searchBar.classList.add('form-control', 'input-block', 'pl-5', 'js-filterable-field')

    searchContainer.innerHTML = searchSvg
    searchContainer.appendChild(searchBar)
    searchContainer.appendChild(message)
    targetElement.insertBefore(searchContainer, targetElement.firstChild)

    searchBar.addEventListener(
      'input',
      debounce((event: Event) => {
        const target = event.target as HTMLInputElement
        searchFileContents(target.value)
      })
    )
  }
})

function debounce<T extends (...args: any[]) => void>(func: T, timeout = 300): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // @ts-ignore `this` is needed, but typing it is a nightmare
      func.apply(this, args)
    }, timeout)
  }
}

function resetHighlightedLines() {
  document.querySelectorAll(`.${highlightClass}`).forEach((element) => element.classList.remove(highlightClass))
}

function searchFileContents(filterStr: string) {
  resetHighlightedLines()
  const fileElements = Array.from(document.querySelectorAll(selectors.fileElement))

  const resetInlineStyles = (element: HTMLElement) => {
    element.style.cssText = ''
  }

  const hideFileElement = (fileElement: HTMLElement) => {
    fileElement.style.visibility = 'hidden'
    fileElement.style.height = '0'
    fileElement.style.marginBottom = '0'
  }

  // TODO: Use a custom class instead of inline styles to make it easier to apply and reset
  fileElements.forEach((fileElement) => {
    const element = fileElement as HTMLElement
    const isUnrendered = element.querySelector(selectors.diffLoadContainer) !== null

    if (filterStr === '' || isUnrendered) {
      resetInlineStyles(element)
      if (!isUnrendered) {
        Array.from(element.querySelectorAll(selectors.codeLine)).forEach((lineElement) =>
          resetInlineStyles(lineElement as HTMLElement)
        )
      }
      return
    }

    const codeLineElements = Array.from(element.querySelectorAll(selectors.codeLine)) as HTMLElement[]
    const matchingLines = codeLineElements.filter(
      (lineElement) => lineElement.textContent?.includes(filterStr) ?? false
    )

    if (!matchingLines.length) {
      hideFileElement(element)
    } else {
      resetInlineStyles(element)
    }

    matchingLines.forEach((lineElement) => {
      // TODO: highlight the matching text rather than just the line
      lineElement.classList.add(highlightClass)
    })
  })
}
