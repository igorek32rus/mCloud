import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

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

import { ModalProvider, NotifyContext, LoaderContext, MainMenuProvider, AuthContext } from '../Context'
import { DirContext } from '../contexts/DirContext/DirContext'
import { SelectionContextProvider } from '../contexts/SelectionContext/SelectionContextProvider'
import { DragnDropFilesContextProvider } from '../contexts/DragnDropFilesContext/DragnDropFilesContextProvider'
import { ContextMenuContextProvider } from '../contexts/ContextMenuContext/ContextMenuContextProvider'
import { WindowSizeContext } from '../contexts/WindowSizeContext/WindowSizeContext'
import { CopyCutPasteContextProvider } from '../contexts/CopyCutPasteContext/CopyCutPasteContextProvider'

import useFetch from '../hooks/useFetch'
import { URLS } from '../constants'
import categories from '../categories'

function MainPage() {
  const { createNotification } = useContext(NotifyContext)
  const {loading, setLoading} = useContext(LoaderContext)
  const { userData } = useContext(AuthContext)

  const [dir, setDir] = useState([])
  const [path, setPath] = useState([])
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0
  })
  let timerWindowSize = 0

  const fetch = useFetch()

  const {category, parent} = useParams()
  const categoryParams = categories.find(cat => cat.name === category)

  const search = async (fileName) => {
    setLoading(true)
    const reqParams = [{
        name: 'fileName',
        value: fileName
    }]

    const res = await fetch({
        url: URLS.SEARCH_FILES, 
        reqParams
    })

    setDir(res.files)
    setLoading(false)
  }

  const getFiles = async () => {
    setLoading(true)
    let reqParams = [{
      name: 'parent',
      value: parent
    }, {
      name: 'category',
      value: category
    }]

    const updateDir = await fetch({
      url: URLS.GET_FILES,
      reqParams
    })

    if (updateDir.files) {
      setDir(updateDir.files)
    }

    if (updateDir.path) {
      setPath(updateDir.path)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (category === "search") {
      search(parent)
    } else {
      getFiles()
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

  const changeParent = async (idNewParent, files) => {
    try {
      const updatedDir = await fetch({
        url: URLS.MOVE_FILES, 
        method: 'POST', 
        data: {idNewParent, files, curDir: path[path.length - 1]}
      })

      if (updatedDir.files) {
        setDir(updatedDir.files)
        createNotification({
          title: `Перемещение объектов`, 
          message: `Объекты успешно перемещены`
        })
      }

      if (updatedDir.error) {
        createNotification({
          title: `Перемещение объектов`, 
          message: updatedDir.error
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DirContext.Provider value={{dir, setDir}}>

      <SelectionContextProvider>

        <MainMenuProvider>
          <Header />
          <Sidebar />
        </MainMenuProvider>
        <div className="pageBodyMain">
          <ModalProvider>
            {categoryParams.showTopPanel && <TopPanel path={path} /> }
            <TitlePage>
              { parent !== userData.rootId && categoryParams.showBackButtonInTitle && <BackButton /> }
              <h1>
                { path[path.length - 1]?._id === userData.rootId || category === "search"
                    ? categoryParams.title
                    : path[path.length - 1]?.name
                }
              </h1>
            </TitlePage>
            {loading 
              ? <Loader /> 
              : <CopyCutPasteContextProvider>
                  <ContextMenuContextProvider>
                    <DragnDropFilesContextProvider>
                      <WindowSizeContext.Provider value={{windowSize}} >
                        <DirContent changeParent={changeParent} />
                      </WindowSizeContext.Provider>
                    </DragnDropFilesContextProvider>
                  </ContextMenuContextProvider>
                </CopyCutPasteContextProvider> 
            }
          </ModalProvider>
        </div>
        <Notify />
        <Footer />

      </SelectionContextProvider>
      
    </DirContext.Provider>
  );
}

export default MainPage
