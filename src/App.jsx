import { RouterProvider } from 'react-router-dom'
import router from './app/router.jsx'
import './shared/styles/index.css'
import './shared/styles/variables.css'
import '../i18n.js';

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
