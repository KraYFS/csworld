import { RouterProvider } from 'react-router-dom'
import router from './app/router.jsx'
import './shared/styles/index.css'
import './shared/styles/variables.css'
import '../i18n.js';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <div>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </div>
  )
}

export default App
