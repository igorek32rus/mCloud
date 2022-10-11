import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { GeneralProvider } from './Context'
import AppRouter from './AppRouter'
// import Auth from './components/Auth/Auth'
import { useAuth } from './hooks/useAuth'
import Loader from './components/UI/loader/Loader'

function App() {
    const auth = useAuth()
    const { loading } = useSelector(state => state.auth)

    React.useEffect(() => {
        auth()
    }, [])

    return (
        <>
            { loading ? <Loader /> : (
                <GeneralProvider>
                    <BrowserRouter>
                        <AppRouter />
                    </BrowserRouter>
                </GeneralProvider>
            )}
        </>
    );
}

export default App;
