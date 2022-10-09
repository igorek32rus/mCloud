import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../components/Header'
import Notify from '../components/Notify'
import Footer from '../components/Footer'
import TopPanel from '../components/TopPanel'
import TitlePage from '../components/TitlePage'
import DirContent from '../components/DirContent'
import Loader from '../components/UI/loader/Loader'
import Sidebar from '../components/Sidebar'

import BackButton from '../components/BackButton'

import '../styles/App.css'

import { ModalProvider, MainMenuProvider } from '../Context'
import { DragnDropFilesContextProvider } from '../contexts/DragnDropFilesContext/DragnDropFilesContextProvider'
import { WindowSizeContext } from '../contexts/WindowSizeContext/WindowSizeContext'

import categories from '../categories'

import { asyncGetCategoryFiles, asyncGetSearchFiles } from '../store/asyncActions/dir'
import { clearPositionFiles } from '../store/selectionReducer'

function MainPage() {
    const userData = useSelector(state => state.auth.userData)
    const { path, loading, currentDir } = useSelector(state => state.dir)
    const dispatch = useDispatch()

    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0
    })
    let timerWindowSize = 0

    const { category, parent } = useParams()
    const categoryParams = categories.find(cat => cat.name === category)

    useEffect(() => {
        dispatch(clearPositionFiles())
        if (category === "search") {
            dispatch(asyncGetSearchFiles(parent))
        } else {
            dispatch(asyncGetCategoryFiles(parent, category))
        }
    }, [category, parent])

    const updateWindowSize = () => {
        if (timerWindowSize) {
            clearTimeout(timerWindowSize)
        }

        timerWindowSize = setTimeout(() => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }, 300);
    }

    useEffect(() => {
        window.addEventListener("resize", updateWindowSize)
        updateWindowSize()

        return () => window.removeEventListener("resize", updateWindowSize)
    }, [])

    return (
        <>

            <MainMenuProvider>
                <Header />
                <Sidebar />
            </MainMenuProvider>
            <div className="pageBodyMain">
                <ModalProvider>
                    {categoryParams.showTopPanel && <TopPanel path={path} />}
                    <TitlePage>
                        {parent !== userData.rootId && categoryParams.showBackButtonInTitle && <BackButton />}
                        <h1>
                            {currentDir?._id === userData.rootId || category === "search"
                                ? categoryParams.title
                                : currentDir?.name
                            }
                        </h1>
                    </TitlePage>
                    {loading
                        ? <Loader />
                        : <DragnDropFilesContextProvider>
                            <WindowSizeContext.Provider value={{ windowSize }} >
                                <DirContent />
                            </WindowSizeContext.Provider>
                        </DragnDropFilesContextProvider>
                    }
                </ModalProvider>
            </div>
            <Notify />
            <Footer />

        </>
    );
}

export default MainPage
