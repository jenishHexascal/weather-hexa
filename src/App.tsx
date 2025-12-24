import { Render } from './views/Render'
import { Settings } from './views/Settings'

import './styles/tokens.css'
import './styles/components.css'

export function App() {
  // Safe check for browser environment
  const path =
    typeof window !== 'undefined'
      ? window.location.pathname
      : '/render'

  if (path.includes('settings')) {
    return <Settings />
  }

  return <Render />
}