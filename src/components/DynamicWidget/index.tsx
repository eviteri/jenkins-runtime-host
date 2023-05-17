import React, { FC } from 'react'
import { RemoteConfigDetails } from '../../services/remotesConfig/types'
import useFederatedComponent from './useFederatedComponent'
import './DynamicWidget.css'

interface WidgetProps {
  title?: string
}
interface DynamicWidgetProps {
  isAppLoading: boolean
  remoteConfigDetails: RemoteConfigDetails | undefined
}

const DynamicWidget: FC<DynamicWidgetProps> = ({
  isAppLoading,
  remoteConfigDetails
}) => {
  const { Component: FederatedComponent, errorLoading } = useFederatedComponent(
    remoteConfigDetails?.url ?? '',
    remoteConfigDetails?.scope ?? '',
    remoteConfigDetails?.module ?? ''
  )

  // This is a workaround to get intelligence working
  const DynamicComponent = FederatedComponent as FC<WidgetProps>

  const isLoading = isAppLoading || !FederatedComponent

  if (errorLoading) {
    return <div>{`Error loading module "${remoteConfigDetails?.module}"`}</div>
  }

  if (isLoading) {
    return <div></div>
  }

  return (
    <div className="page-wrapper">
      <h1>Dynamic Widget</h1>
      <div className="container-widget-wrapper">
        <React.Suspense fallback="Loading System">
          {FederatedComponent && (
            <DynamicComponent title={'Title from Container'} />
          )}
        </React.Suspense>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
    </div>
  )
}
export default DynamicWidget
