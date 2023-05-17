import React from 'react'
import { loadComponent } from './helpers'
import useDynamicScript from './useDynamicScript'

const componentCache = new Map()

const useFederatedComponent = (
  remoteUrl: string,
  scope: string,
  module: string
) => {
  const key = `${remoteUrl}-${scope}-${module}`
  const [Component, setComponent] = React.useState<unknown>(null)

  const { ready, errorLoading } = useDynamicScript(remoteUrl)
  React.useEffect(() => {
    if (Component) setComponent(null)
    // Only recalculate when key changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  React.useEffect(() => {
    if (ready && !Component) {
      const Comp = React.lazy(loadComponent(scope, module))
      componentCache.set(key, Comp)
      setComponent(Comp)
    }
    // key includes all dependencies (scope/module)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Component, ready, key])

  return { errorLoading, Component }
}

export default useFederatedComponent
