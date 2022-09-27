import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Header from '../components/Header'
import Notify from '../components/Notify'
import Footer from '../components/Footer'
import TopPanel from '../components/TopPanel'
import TitlePage from '../components/TitlePage'
import DirShareContent from '../components/DirShareContent'
import Loader from '../components/UI/loader/Loader'
import Sidebar from '../components/Sidebar'

import '../styles/App.css'

import { ModalProvider, NotifyContext, LoaderContext, MainMenuProvider } from '../Context'
import { DirContext } from '../contexts/DirContext/DirContext'
import { SelectionContextProvider } from '../contexts/SelectionContext/SelectionContextProvider'
import { ContextMenuContextProvider } from '../contexts/ContextMenuContext/ContextMenuContextProvider'
import { WindowSizeContext } from '../contexts/WindowSizeContext/WindowSizeContext'

import useFetch from '../hooks/useFetch'
import { URLS } from '../constants'

function SharePage() {
  const { createNotification } = useContext(NotifyContext)
  const {loading, setLoading} = useContext(LoaderContext)

  const [dir, setDir] = useState([])
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  })
  let timerWindowSize = 0

  const fetch = useFetch()

  const { fileID } = useParams()


  const getShareFile = React.useCallback(async () => {
    setLoading(true)
    let reqParams = [{
      name: 'accessLink',
      value: fileID
    }]

    const getShareFile = await fetch({
      url: URLS.GET_SHARE_FILE,
      reqParams
    })

    if (getShareFile.files) {
      setDir(getShareFile.files)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    getShareFile()
  }, [])

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
    <DirContext.Provider value={{dir, setDir}}>

      <SelectionContextProvider>

        <MainMenuProvider>
          <Header />
          <Sidebar />
        </MainMenuProvider>
        <div className="pageBodyMain">
          <ModalProvider>
            {/* <TopPanel path={path} /> */}
            {/* <TitlePage currentDir={path[path.length - 1]} /> */}
            {loading 
              ? <Loader /> 
              : <ContextMenuContextProvider>
                  <WindowSizeContext.Provider value={{windowSize}} >
                    <DirShareContent />
                  </WindowSizeContext.Provider>
                </ContextMenuContextProvider>
            }
          </ModalProvider>
        </div>
        <Notify />
        <Footer />

      </SelectionContextProvider>
      
    </DirContext.Provider>
  );
}

export default SharePage
