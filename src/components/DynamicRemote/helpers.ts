type Scope = unknown
type Factory = () => any

type Container = {
  init(shareScope: Scope): void
  get(module: string): Factory
}

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>
declare const __webpack_share_scopes__: { default: Scope }

const loadScope = (url: string, scope: string) => {
  const element = document.createElement('script')
  const promise = new Promise((resolve, reject) => {
    element.src = url
    element.type = 'text/javascript'
    element.async = true
    element.onload = () => resolve(window[scope as keyof typeof window])
    element.onerror = reject
  })
  document.head.appendChild(element)
  promise.finally(() => document.head.removeChild(element))
  return promise
}

export interface LoadModuleOptions {
  url: string
  scope: string
  module: string
}

export const loadModule = async <T>({
  url,
  scope,
  module
}: LoadModuleOptions): Promise<T> => {
  try {
    const container = (await loadScope(url, scope)) as Container
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default')
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default)
    const factory = await container.get(module)
    return factory()
  } catch (error) {
    console.error('Error loading module:', error)
    throw new Error('Error loading module')
  }
}
