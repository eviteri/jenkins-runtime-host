export type RemoteMountFunction = (el: HTMLElement) => void

export interface RemoteModuleResponse {
  default: {
    remoteMount: RemoteMountFunction
  }
}
