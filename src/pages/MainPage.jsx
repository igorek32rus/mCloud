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

import '../styles/App.css'

import { ModalProvider, NotifyContext, LoaderContext, MainMenuProvider } from '../Context'
import { DirContext } from '../contexts/DirContext/DirContext'
import { SelectionContextProvider } from '../contexts/SelectionContext/SelectionContextProvider'

import useFetch from '../hooks/useFetch'
import { URLS } from '../constants'

function MainPage() {
  const { createNotification } = useContext(NotifyContext)
  const {loading, setLoading} = useContext(LoaderContext)

  const [dir, setDir] = useState([])
  const [path, setPath] = useState([])

  const fetch = useFetch()

  const {category, parent} = useParams()

  useEffect(() => {
    const openFolder = async () => {
      setLoading(true)
      let reqParams = [{
        name: 'parent',
        value: parent
      }]

      if (category !== 'main') reqParams.push({
        name: 'category',
        value: category
      })

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
    openFolder()
  }, [category, parent])

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
            {category === 'main' && <TopPanel path={path} /> }
            <TitlePage currentDir={path[path.length - 1]} />
            {loading 
              ? <Loader /> 
              : <DirContent changeParent={changeParent} />
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
