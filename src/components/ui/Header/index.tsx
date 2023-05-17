import { FC } from 'react'
import './Header.css'

export type Routes = 'home' | 'app1' | 'app2' | 'error'

interface HeaderProps {
  currentRoute: Routes
  handleRouteChange: (route: Routes) => void
}

const Header: FC<HeaderProps> = ({ currentRoute, handleRouteChange }) => {
  return (
    <header className="header">
      <div>Container Logo</div>
      <nav className="navigation">
        <ul>
          <li>
            <a
              className={currentRoute === 'home' ? 'active' : ''}
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                handleRouteChange('home')
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className={currentRoute === 'app1' ? 'active' : ''}
              href="#app1"
              onClick={(e) => {
                e.preventDefault()
                handleRouteChange('app1')
              }}
            >
              App 1
            </a>
          </li>
          <li>
            <a
              className={currentRoute === 'app2' ? 'active' : ''}
              href="#app2"
              onClick={(e) => {
                e.preventDefault()
                handleRouteChange('app2')
              }}
            >
              App 2
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default Header
