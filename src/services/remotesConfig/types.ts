export type RemotesKeys = 'app1' | 'app2'

export interface RemoteConfigDetails {
  url: string
  scope: string
  module: string
}

export type RemotesConfig = {
  [key in RemotesKeys]: RemoteConfigDetails
}
