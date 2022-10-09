import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../components/Header'
import Notify from '../components/Notify'
import Footer from '../components/Footer'
import TopPanel from '../components/TopPanel'
import TitlePage from '../components/TitlePage'
import DirShareContent from '../components/DirShareContent'
import Loader from '../components/UI/loader/Loader'
import Sidebar from '../components/Sidebar'

import '../styles/App.css'

import { ModalProvider, MainMenuProvider } from '../Context'
import { SelectionContextProvider } from '../contexts/SelectionContext/SelectionContextProvider'
import { ContextMenuContextProvider } from '../contexts/ContextMenuContext/ContextMenuContextProvider'
import { WindowSizeContext } from '../contexts/WindowSizeContext/WindowSizeContext'

import { asyncGetSharedFile } from '../store/asyncActions/dir'

function SharePage() {
  const dispatch = useDispatch()
  const {loading, currentDir, errorMessage} = useSelector(state => state.dir)

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  })
  let timerWindowSize = 0

  const { fileID } = useParams()

  useEffect(() => {
    dispatch(asyncGetSharedFile(fileID))
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
            <h1>{ currentDir === "folder" ? currentDir.name : "Общий доступ" }</h1>
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
