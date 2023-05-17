import { useCallback, useEffect, useState } from 'react'
import './App.css'
import DynamicRemote from './components/DynamicRemote'
import DynamicWidget from './components/DynamicWidget'
import Home from './components/Home'
import Header, { Routes } from './components/ui/Header'
import { getRemotesConfig } from './services/remotesConfig'
import { remotesConfig } from './services/remotesConfig/localRemotesConfig'
import { RemotesConfig } from './services/remotesConfig/types'

// Testing Jenkins Connection
function App() {
  const [currentRoute, setCurrentRoute] = useState<Routes>('home')
  const [remotesAppConfig, setRemotesAppConfig] =
    useState<RemotesConfig | null>()
  const [requestLoading, setRequestLoading] = useState(false)
  const [requestError, setRequestError] = useState('')

  const handleRouteChange = (route: Routes) => {
    setCurrentRoute(route)
  }

  const fetchRemotesAppConfigDetails = useCallback(async () => {
    setRequestLoading(true)
    try {
      let remoteAppConfig: RemotesConfig

      // Fetch the remote app config based on the environment
      if (process.env.NODE_ENV === 'production') {
        remoteAppConfig = await getRemotesConfig()
      } else {
        remoteAppConfig = remotesConfig
      }

      setRemotesAppConfig(remoteAppConfig)
    } catch (error) {
      const { message } = error as Error
      setCurrentRoute('error')
      setRequestError(message)
    }
    setRequestLoading(false)
  }, [])

  //  Get the remote app config details
  useEffect(() => {
    if (!remotesAppConfig) {
      fetchRemotesAppConfigDetails()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header
        currentRoute={currentRoute}
        handleRouteChange={handleRouteChange}
      />
      <main className="main-content">
        {currentRoute === 'home' && <Home />}
        {currentRoute === 'app1' && (
          <DynamicRemote
            isAppLoading={requestLoading}
            remoteConfigDetails={remotesAppConfig?.['app1']}
          />
        )}
        {currentRoute === 'app2' && (
          <DynamicWidget
            isAppLoading={requestLoading}
            remoteConfigDetails={remotesAppConfig?.['app2']}
          />
        )}
        {currentRoute === 'error' && <div>{requestError}</div>}
      </main>
      <footer className="site-footer">
        <div>Container Footer</div>
      </footer>
    </>
  )
}

export default App
