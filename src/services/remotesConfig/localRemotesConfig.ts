import { RemotesConfig } from './types'

export const remotesConfig: RemotesConfig = {
  app1: {
    url: 'http://localhost:3001/remoteEntry.js',
    scope: 'remote',
    module: './RemoteRunTime'
  },
  app2: {
    url: 'http://localhost:3002/remoteEntry.js',
    scope: 'remote2',
    module: './Widget'
  }
}
