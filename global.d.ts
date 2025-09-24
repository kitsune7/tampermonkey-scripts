// Global TamperMonkey API types
declare namespace GM {
  function getValue(key: string, defaultValue?: any): any
  function setValue(key: string, value: any): void
  function deleteValue(key: string): void
  function listValues(): string[]
  function getResourceText(name: string): string
  function getResourceURL(name: string): string
  function addStyle(css: string): HTMLStyleElement
  function openInTab(url: string, active?: boolean): void
  function xmlHttpRequest(details: {
    method?: string
    url: string
    headers?: Record<string, string>
    data?: string
    onload?: (response: GMXMLHttpRequestResponse) => void
    onerror?: (response: GMXMLHttpRequestResponse) => void
    onreadystatechange?: (response: GMXMLHttpRequestResponse) => void
  }): void
  function notification(details: { text: string; title?: string; image?: string; onclick?: () => void }): void
  function setClipboard(data: string, info?: string): void
  function info(): {
    script: {
      name: string
      namespace: string
      version: string
      description: string
      author: string
      homepage?: string
      updateURL?: string
      downloadURL?: string
      supportURL?: string
      includes: string[]
      matches: string[]
      excludes: string[]
      grants: string[]
      resources: Record<string, string>
    }
    scriptMetaStr: string
    scriptWillUpdate: boolean
    version: string
  }
}

interface GMXMLHttpRequestResponse {
  readyState: number
  responseHeaders: string
  responseText: string
  status: number
  statusText: string
  finalUrl: string
}

// Legacy GM_ functions
declare function GM_getValue(key: string, defaultValue?: any): any
declare function GM_setValue(key: string, value: any): void
declare function GM_deleteValue(key: string): void
declare function GM_listValues(): string[]
declare function GM_getResourceText(name: string): string
declare function GM_getResourceURL(name: string): string
declare function GM_addStyle(css: string): HTMLStyleElement
declare function GM_openInTab(url: string, active?: boolean): void
declare function GM_xmlhttpRequest(details: {
  method?: string
  url: string
  headers?: Record<string, string>
  data?: string
  onload?: (response: GMXMLHttpRequestResponse) => void
  onerror?: (response: GMXMLHttpRequestResponse) => void
  onreadystatechange?: (response: GMXMLHttpRequestResponse) => void
}): void
declare function GM_notification(details: { text: string; title?: string; image?: string; onclick?: () => void }): void
declare function GM_setClipboard(data: string, info?: string): void
declare function GM_info(): typeof GM.info

// Common userscript utility types
interface UserScriptHeader {
  name?: string
  namespace?: string
  version?: string
  description?: string
  author?: string
  match?: string | string[]
  include?: string | string[]
  exclude?: string | string[]
  require?: string | string[]
  resource?: string | string[]
  grant?: string | string[]
  'run-at'?: 'document-start' | 'document-body' | 'document-end' | 'document-idle' | 'context-menu'
  icon?: string
  icon64?: string
  updateURL?: string
  downloadURL?: string
  supportURL?: string
  homepage?: string
  homepageURL?: string
  website?: string
  source?: string
  antifeature?: string
  noframes?: boolean
  unwrap?: boolean
  nocompat?: string
  connect?: string | string[]
  sandbox?: 'raw' | 'JavaScript' | 'DOM'
}

// Enhanced DOM types for userscripts
interface Element {
  matches(selectors: string): boolean
  closest(selectors: string): Element | null
}

interface HTMLElement {
  click(): void
  focus(): void
  blur(): void
  scrollIntoView(options?: boolean | ScrollIntoViewOptions): void
}

// MutationObserver enhancement
interface MutationObserverInit {
  childList?: boolean
  attributes?: boolean
  characterData?: boolean
  subtree?: boolean
  attributeOldValue?: boolean
  characterDataOldValue?: boolean
  attributeFilter?: string[]
}

// Common event types for userscripts
interface KeyboardEventInit extends EventInit {
  key?: string
  code?: string
  location?: number
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  metaKey?: boolean
  repeat?: boolean
  isComposing?: boolean
}

interface MouseEventInit extends EventInit {
  screenX?: number
  screenY?: number
  clientX?: number
  clientY?: number
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  metaKey?: boolean
  button?: number
  buttons?: number
  relatedTarget?: EventTarget | null
}

// Utility types for userscript development
type SelectorFunction = (selector: string) => Element | null
type SelectorAllFunction = (selector: string) => NodeList

type ReadyHandlerFunction = (targetElement: HTMLElement) => void

type KeypressAction = (eventTarget?: HTMLElement) => void
type KeypressMap = Record<string, KeypressAction>

// Common CSS property types
interface CSSStyleDeclarationExtended extends CSSStyleDeclaration {
  [key: string]: string | number | Function | null
}

// Animation event types
interface AnimationEventExtended extends AnimationEvent {
  animationName: string
  elapsedTime: number
  pseudoElement: string
}

// Common userscript patterns
interface DebounceFunction {
  <T extends (...args: any[]) => void>(func: T, timeout?: number): (...args: Parameters<T>) => void
}

interface ThrottleFunction {
  <T extends (...args: any[]) => void>(func: T, limit?: number): (...args: Parameters<T>) => void
}

// Storage types for userscripts
interface UserScriptStorage {
  get<T = any>(key: string, defaultValue?: T): T
  set<T = any>(key: string, value: T): void
  remove(key: string): void
  clear(): void
  keys(): string[]
}

// Common observer patterns
interface ElementObserverOptions {
  selector: string
  callback: (element: HTMLElement) => void
  once?: boolean
  timeout?: number
}

// URL matching types
type URLPattern = string | RegExp
type URLMatcher = URLPattern | URLPattern[]

// Common userscript utilities interface
interface UserScriptUtils {
  addStyles(css: string, parent?: string): void
  createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    attributes?: Record<string, string>,
    children?: HTMLElement | HTMLElement[] | string
  ): HTMLElementTagNameMap[K]
  setReadyHandler(selector: string, callback: ReadyHandlerFunction): void
  clickWhenReady(selector: string): void
  removeWhenReady(selector: string): void
  findElementByText(text: string, root?: HTMLElement): Node | undefined
  findElementsByText(text: string, root?: HTMLElement): (Node | undefined)[]
  addHotkeys(element: HTMLElement, keyMap: KeypressMap): void
  debounce: DebounceFunction
  throttle: ThrottleFunction
}
