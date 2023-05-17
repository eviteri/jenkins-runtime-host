import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { RemoteConfigDetails } from '../../services/remotesConfig/types'
import { loadModule } from './helpers'
import { RemoteModuleResponse } from './types'

interface DynamicRemoteProps {
  isAppLoading: boolean
  remoteConfigDetails: RemoteConfigDetails | undefined
}

const DynamicRemote: FC<DynamicRemoteProps> = ({
  isAppLoading,
  remoteConfigDetails
}) => {
  const [loadModuleError, setLoadModuleError] = useState('')
  const [loadingModule, setLoadingModule] = useState(false)

  const ref = useRef<HTMLDivElement | null>(null)
  const isLoading = isAppLoading || loadingModule

  const fetchRemoteMountFunction = useCallback(async () => {
    setLoadingModule(true)
    try {
      if (ref.current && remoteConfigDetails) {
        // Load the remote module based on the remote app config
        const {
          default: { remoteMount }
        } = await loadModule<RemoteModuleResponse>(remoteConfigDetails)

        remoteMount(ref.current)
      } else {
        throw new Error('ref.current is null or remoteConfigDetails is null')
      }
    } catch (error) {
      const { message } = error as Error
      setLoadModuleError(message)
    }
    setLoadingModule(false)
  }, [remoteConfigDetails, ref])

  // Load the remote module based on the remote app config details
  useEffect(() => {
    if (remoteConfigDetails && ref.current) {
      fetchRemoteMountFunction()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remoteConfigDetails])

  if (loadModuleError) {
    return <div>{loadModuleError}</div>
  }

  return (
    <div>
      {/* {isLoading && <div>Loading....</div>} */}
      <div ref={ref} style={{ display: isLoading ? 'none' : 'block' }}></div>
    </div>
  )
}
export default DynamicRemote
