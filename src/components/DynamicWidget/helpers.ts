type Scope = unknown

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>
declare const __webpack_share_scopes__: { default: Scope }

export const loadComponent = (scope: string, module: string) => {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default')
    const container = window[scope as keyof typeof window] // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default)
    const factory = await window[scope as keyof typeof window].get(module)
    const Module = factory()
    return Module
  }
}
