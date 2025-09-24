export function addHotkeysToElement(
  element: HTMLElement,
  keypressToAction: Record<string, (eventTarget?: HTMLElement) => void>
) {
  element.addEventListener('keydown', function handleKeypress(event) {
    const keypresses = Object.keys(keypressToAction)
    keypresses.forEach((keypress) => {
      if (_isKeypress(keypress, event)) {
        event.preventDefault()
        if (event.target instanceof HTMLElement) {
          keypressToAction[keypress](event.target)
        }
      }
    })
  })

  function _isKeypress(keypress: string, event: KeyboardEvent) {
    const keyToModifier = {
      ctrl: 'Control',
      control: 'Control',
      command: 'Meta',
      cmd: 'Meta',
      win: 'OS',
      winkey: 'OS',
      alt: 'Alt',
      option: 'Alt',
      shift: 'Shift',
    }
    const validModifiers = Object.keys(keyToModifier)
    const keys = keypress
      .toLowerCase()
      .split('+')
      .map((key) => key.trim())

    while (keys.length) {
      const key = keys.at(-1) ?? ''
      if (validModifiers.includes(key)) {
        if (!event.getModifierState(keyToModifier[key as keyof typeof keyToModifier])) {
          return false
        }
      } else if (event.key.toLowerCase() !== key) {
        return false
      }

      keys.pop()
    }

    return true
  }
}

export function addStyles(cssString: string, parentSelector = 'head') {
  const styleElement = document.createElement('style')
  styleElement.appendChild(document.createTextNode(cssString))

  const parentElement = document.querySelector(parentSelector)
  if (!parentElement) {
    throw new Error(`Parent element not found for selector: ${parentSelector}`)
  }
  parentElement.appendChild(styleElement)
}

export function appendChild(selector: string, child: HTMLElement, selectorFunction = document.querySelector) {
  const selectedElement = selectorFunction(selector)
  if (!selectedElement) {
    throw new Error(`Element not found for selector: ${selector}`)
  }
  selectedElement.appendChild(child)
}

export function clickWhenReady(selector: string, selectorFunction = document.querySelector) {
  setReadyHandler(selector, (element: HTMLElement) => element.click(), selectorFunction)
}

export function copyElementTextToClipboard(inputSelector: string) {
  const copyText = document.querySelector(inputSelector)
  if (!copyText) {
    throw new Error(`Element not found for selector: ${inputSelector}`)
  }
  if (!(copyText instanceof HTMLInputElement || copyText instanceof HTMLTextAreaElement)) {
    throw new Error(`Element not an input/textarea for selector: ${inputSelector}`)
  }

  /* Select the text field */
  copyText.select()
  copyText.setSelectionRange(0, 99999) /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand('copy')
}

export function createElement(
  element: string,
  props: Record<string, string> | null = null,
  children: HTMLElement | HTMLElement[] | string | null = null
): HTMLElement {
  const newElement = document.createElement(element)

  function _addAttribute(name: string) {
    const attribute = document.createAttribute(name)
    attribute.value = props?.[name] ?? ''
    newElement.setAttributeNode(attribute)
  }

  for (const attribute in props) {
    _addAttribute(attribute)
  }

  if (children) {
    if (typeof children === 'string') {
      newElement.appendChild(document.createTextNode(children))
    } else if (Array.isArray(children)) {
      children.forEach((child) => newElement.appendChild(child))
    } else {
      newElement.appendChild(children)
    }
  }

  return newElement
}

export function findElementByText(searchText = '', rootElement: HTMLElement = document.body) {
  return getTextNodes(rootElement).find((node) => node.data.includes(searchText))?.parentNode
}

export function findElementsByText(searchText = '', rootElement = document.body) {
  return getTextNodes(rootElement)
    .filter((node) => node.data.includes(searchText))
    .map((node) => node?.parentNode)
}

export function getTextNodes(rootElement = document.body): Text[] {
  const textNodes: Text[] = []
  const nodeIterator = document.createNodeIterator(rootElement, NodeFilter.SHOW_TEXT, null)

  let node: Text | null
  while ((node = nodeIterator.nextNode() as Text | null)) {
    textNodes.push(node)
  }

  return textNodes
}

export function removeWhenReady(selector: string, selectorFunction = document.querySelector) {
  setReadyHandler(selector, (element: HTMLElement) => element.remove(), selectorFunction)
}

export function setInputValue(inputElement: HTMLElement, value: string) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
  if (!nativeInputValueSetter) {
    throw new Error('Could not find native input value setter')
  }
  nativeInputValueSetter.call(inputElement, value)

  const event = new Event('input', { bubbles: true })
  inputElement.dispatchEvent(event)
}

export function setReadyHandler(
  selector = '*',
  readyFunction: (targetElement: HTMLElement) => void,
  selectorFunction = document.querySelector.bind(document)
) {
  function _runReadyHandler() {
    const element = selectorFunction(selector) as HTMLElement | null
    if (element) {
      readyFunction(element)
    }
  }

  const nodeInsertedAnimation = `
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
  `
  addStyles(nodeInsertedAnimation)

  function handleNodeInsertion(event: AnimationEvent) {
    if (event.animationName === 'nodeInserted') {
      _runReadyHandler()
    }
  }
  document.addEventListener('animationstart', handleNodeInsertion, false)

  if (document.querySelector(selector)) {
    _runReadyHandler()
  }
}

export function setTextareaValue(textareaElement: HTMLTextAreaElement, value: string) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set
  if (!nativeInputValueSetter) {
    throw new Error('Could not find native textarea value setter')
  }
  nativeInputValueSetter.call(textareaElement, value)

  const event = new Event('input', { bubbles: true })
  textareaElement.dispatchEvent(event)
}
