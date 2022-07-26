import React, { useState, useContext, useEffect, useMemo, useRef } from 'react'

import TopPanel from '../components/TopPanel'
import TitlePage from '../components/TitlePage'
import DirContent from '../components/DirContent'
import Loader from '../components/UI/loader/Loader'

import '../styles/App.css'

import { ModalProvider, AuthContext, NotifyContext, LoaderContext } from '../Context'

import fetchReq from '../utils/fetchReq'
import useQuery from '../hooks/useQuery'

function MainPage() {
  const {userData} = useContext(AuthContext)
  const {createNotification, removeNotification} = useContext(NotifyContext)
  const {loading, setLoading} = useContext(LoaderContext)

  const [dir, setDir] = useState([])
  const [path, setPath] = useState([])

  const queryParams = useQuery()

  let category = queryParams.get("category") ? queryParams.get("category") : 'main'

  const changeDir = async (idDir) => {
    let cat = category !== 'main' ? '/' + category : ''
    const updateDir = await fetchReq({
      url: `http://localhost:5000/api/files${cat}?parent=${idDir}`
    })

    if (updateDir.files && updateDir.path) {
      setDir(updateDir.files)
      setPath(updateDir.path)
    }
  }

  useEffect(async () => {
    setLoading(true)
    const parent = queryParams.get("parent")
    category = queryParams.get("category") ? queryParams.get("category") : 'main'

    if (!parent) {
      await changeDir(userData.rootId)
    } else {
      await changeDir(parent)
    }
    setLoading(false)
  }, [queryParams])

  const changeParent = async (idNewParent, files) => {
    try {
      const updatedDir = await fetchReq({
        url: 'http://localhost:5000/api/files/move', 
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
    } catch (error) {
      console.log(error);
    }
  }

  return (
    loading ? <Loader /> : 

    <div className="pageBodyMain">
      <ModalProvider>
        {category === 'main' && <TopPanel path={path} changeDir={changeDir} /> }
        <TitlePage currentDir={path[path.length - 1]} />
        <DirContent dir={dir} currentDir={path[path.length - 1]} changeDir={changeDir} changeParent={changeParent} />
      </ModalProvider>
    </div>
  );
}

export default MainPage;
