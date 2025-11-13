// ==UserScript==
// @name         Graphite to GitHub PR Redirect
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add a button to redirect from Graphite PR pages to GitHub
// @author       Christopher Bradshaw
// @icon         https://www.google.com/s2/favicons?sz=64&domain=graphite.com
// @match        https://app.graphite.com/github/pr/*/*/*
// @grant        none
// ==/UserScript==

import { setReadyHandler } from './lib/monkey-utils-reference'

type PRInfo = {
  owner: string
  repo: string
  prNumber: string
}

const customButtonId = 'graphite-to-github-button'
setReadyHandler('main button', insertGithubButton)

function insertGithubButton(targetElement: Node) {
  if (document.getElementById(customButtonId)) {
    return null
  }

  const githubButton = createGithubButton()
  if (!githubButton) {
    console.error('Could not create GitHub button')
    return
  }

  if (targetElement?.parentElement) {
    targetElement.parentElement.insertBefore(githubButton, targetElement)
  }
}

function createGithubButton(): HTMLButtonElement | null {
  const prInfo = extractPrInfo()
  if (!prInfo) return null

  const button = document.createElement('button')
  button.id = customButtonId
  button.setAttribute('aria-pressed', 'false')
  button.className = 'kitsune-button Button_gdsButton__SadwL'
  button.setAttribute('data-kind', 'neutral')
  button.setAttribute('data-priority', 'secondary')
  button.setAttribute('data-size', 'm')
  button.type = 'button'

  const contentsSpan = document.createElement('span')
  contentsSpan.className = 'Button_gdsButtonContents__5B2fy'

  const textSpan = document.createElement('span')
  textSpan.className = 'Button_gdsButtonText__5kyh_'

  const innerTextSpan = document.createElement('span')
  innerTextSpan.className = 'utilities_textColorEmphasis__U9zrW'
  innerTextSpan.textContent = 'View on GitHub'

  textSpan.appendChild(innerTextSpan)
  contentsSpan.appendChild(textSpan)
  button.appendChild(contentsSpan)

  button.addEventListener('click', () => {
    const githubUrl = `https://github.com/${prInfo.owner}/${prInfo.repo}/pull/${prInfo.prNumber}`
    window.open(githubUrl, '_blank')
  })

  button.style.marginRight = '8px'

  return button
}

/* Parse the current URL to extract repo owner, repo name, and PR number */
function extractPrInfo(): PRInfo | null {
  const url = window.location.href
  const match = url.match(/https:\/\/app\.graphite\.com\/github\/pr\/([^\/]+)\/([^\/]+)\/(\d+)/)

  if (!match) {
    console.error('Could not parse Graphite PR URL')
    return null
  }

  return {
    owner: match[1],
    repo: match[2],
    prNumber: match[3],
  }
}
