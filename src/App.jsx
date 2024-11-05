import { RouterProvider } from 'react-router-dom'
import router from './app/router.jsx'
import './shared/styles/index.css'
import './shared/styles/variables.css'

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
