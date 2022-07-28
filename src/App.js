import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { GeneralProvider } from './Context'
import AppRouter from './AppRouter'
import Auth from './components/Auth/Auth'

function App() {
  const [checkAuth, setCheckAuth] = useState(true)

  return (
    <GeneralProvider>
      {checkAuth ? <Auth setCheckAuth={setCheckAuth} /> : (
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      )}
    </GeneralProvider>
  );
}

export default App;
