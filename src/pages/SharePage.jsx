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

import { ModalProvider, NotifyContext, LoaderContext, MainMenuProvider, DirContext } from '../Context'
import { SelectionContextProvider } from '../contexts/SelectionContext/SelectionContextProvider'
import { ContextMenuContextProvider } from '../contexts/ContextMenuContext/ContextMenuContextProvider'
import { WindowSizeContext } from '../contexts/WindowSizeContext/WindowSizeContext'

import useFetch from '../hooks/useFetch'
import { URLS } from '../constants'

function SharePage() {
  const { createNotification } = useContext(NotifyContext)
  const {loading, setLoading} = useContext(LoaderContext)
  const { setDir } = useContext(DirContext)

  const [errorMessage, setErrorMessage] = useState("")
  const [folderName, setFolderName] = useState("Общий доступ")

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

    if (getShareFile.isFolder) {
      setFolderName(getShareFile.folderName)
    }

    if (getShareFile.message) setErrorMessage(getShareFile.message)

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
    <SelectionContextProvider>

      <MainMenuProvider>
        <Header />
        <Sidebar />
      </MainMenuProvider>
      <div className="pageBodyMain">
        <ModalProvider>
          {/* <TopPanel path={path} /> */}
          <TitlePage>
            <h1>{folderName}</h1>
          </TitlePage>
          {loading 
            ? <Loader /> 
            : <ContextMenuContextProvider>
                <WindowSizeContext.Provider value={{windowSize}} >
                  { errorMessage ? <div class="message" style={{marginTop: 10}}>{errorMessage}</div> : <DirShareContent /> }
                </WindowSizeContext.Provider>
              </ContextMenuContextProvider>
          }
        </ModalProvider>
      </div>
      <Notify />
      <Footer />

    </SelectionContextProvider>
  );
}

export default SharePage
