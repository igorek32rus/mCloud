import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react'

import Header from '../components/Header'
import Notify from '../components/Notify'
import Footer from '../components/Footer'
import TopPanel from '../components/TopPanel'
import TitlePage from '../components/TitlePage'
import DirContent from '../components/DirContent'
import Loader from '../components/UI/loader/Loader'
import MainMenu from '../components/MainMenu'

import '../styles/App.css'

import { ModalProvider, AuthContext, NotifyContext, LoaderContext, MainMenuProvider } from '../Context'

// import fetchReq from '../utils/fetchReq'
import useQuery from '../hooks/useQuery'
import useFetch from '../hooks/useFetch'
import { URLS } from '../constants'

function MainPage() {
  const {userData} = useContext(AuthContext)
  const { createNotification } = useContext(NotifyContext)
  const {loading, setLoading} = useContext(LoaderContext)

  const [dir, setDir] = useState([])
  const [path, setPath] = useState([])

  const queryParams = useQuery()
  const fetch = useFetch()

  const category = useMemo(() => queryParams.get("category") ? queryParams.get("category") : 'main', [queryParams])
  const parent = useMemo(() => queryParams.get("parent") ? queryParams.get("parent") : userData.rootId, [queryParams, userData.rootId])

  const changeDir = useCallback(async (idDir) => {
    setLoading(true)
    let reqParams = [{
      name: 'parent',
      value: idDir
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
  }, [category, setLoading])


  useEffect(() => {
    changeDir(parent)
  }, [changeDir, category, parent])

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
    <>
      <MainMenuProvider>
        <Header />
        <MainMenu />
      </MainMenuProvider>
      <div className="pageBodyMain">
        <ModalProvider>
          {!loading && category === 'main' && <TopPanel path={path} changeDir={changeDir} /> }
          {!loading && <TitlePage currentDir={path[path.length - 1]} category={category} changeDir={changeDir} /> }
          {loading 
            ? <Loader /> 
            : <DirContent 
                dir={dir} 
                currentDir={path[path.length - 1]} 
                changeDir={changeDir} 
                changeParent={changeParent}
                category={category} />
          }
        </ModalProvider>
      </div>
      <Notify />
      <Footer />
    </>
  );
}

export default MainPage
