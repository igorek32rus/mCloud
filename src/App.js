import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { GeneralProvider } from './Context'
import AppRouter from './AppRouter'

function App() {
  return (
    <GeneralProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </GeneralProvider>
  );
}

export default App;
