import { createRoot } from 'react-dom/client'
import { TreeProvider } from '../src/context'
import App from './app'
// import './styles.css'

const root = document.getElementById('root')!
createRoot(root).render(
  <TreeProvider>
    <App />
  </TreeProvider>
)
