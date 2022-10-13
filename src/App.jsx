import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRouter'
import { useAuth } from './hooks/useAuth'
import Loader from './components/UI/loader/Loader'
import { setWindowSize } from './store/windowSizeReducer'

import './styles/App.scss'

function App() {
    const { loading } = useSelector(state => state.auth)
    const auth = useAuth()
    const dispatch = useDispatch()
    let timerWindowSize = 0

    React.useEffect(() => {
        auth()
    }, [])

    const updateWindowSize = () => {
        if (timerWindowSize) {
            clearTimeout(timerWindowSize)
        }

        timerWindowSize = setTimeout(() => {
            dispatch(setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            }))
        }, 300)
    }

    React.useEffect(() => {
        window.addEventListener("resize", updateWindowSize)
        updateWindowSize()

        return () => window.removeEventListener("resize", updateWindowSize)
    }, [])

    return (
        <>
            { loading ? <Loader /> : (
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            )}
        </>
    );
}

export default App;
