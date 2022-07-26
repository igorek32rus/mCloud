import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter'
import { AuthProvider, NotifyProvider, LoaderProvider } from './Context'

import Header from './components/Header'
import Notify from './components/Notify'
import Footer from './components/Footer'

function App() {
  return (
    <AuthProvider>
      <NotifyProvider>
        <LoaderProvider>
          <BrowserRouter>
            <Header />
            <AppRouter />
            <Notify />
            <Footer />
          </BrowserRouter>
        </LoaderProvider>
      </NotifyProvider>
    </AuthProvider>
  );
}

export default App;
