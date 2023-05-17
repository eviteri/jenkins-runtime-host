import { RemotesConfig } from './types'

export const getRemotesConfig = async (): Promise<RemotesConfig> => {
  // Get the remote app config from the session storage
  const appConfigFromSession = sessionStorage?.getItem('remoteAppConfig')
    ? JSON.parse(sessionStorage.getItem('remoteAppConfig') as string)
    : null

  // If the remote app config is not in the session storage, make a request to fetch it
  if (!appConfigFromSession) {
    const requestRemoteAppConfig = await fetch(
      'http://syf-digital-assets.s3-website-us-east-1.amazonaws.com/syf-remote-app/remoteAppProdConfig.json'
    )

    const remotesAppConfig = await requestRemoteAppConfig.json()

    // Store the remote app config in the session storage to avoid multiple requests
    sessionStorage.setItem('remoteAppConfig', JSON.stringify(remotesAppConfig))

    return remotesAppConfig
  }

  return appConfigFromSession
}
