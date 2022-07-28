import React, { useState, useContext, useEffect, useRef } from 'react'

import Header from '../components/Header'
import Notify from '../components/Notify'
import Footer from '../components/Footer'
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
  const { createNotification } = useContext(NotifyContext)
  const {loading, setLoading} = useContext(LoaderContext)

  const [dir, setDir] = useState([])
  const [path, setPath] = useState([])

  const queryParams = useQuery()

  let category = queryParams.get("category") ? queryParams.get("category") : 'main'
  const categoryRef = useRef(category)

  const changeDir = async (idDir) => {
    let cat = categoryRef.current !== 'main' ? '&category=' + categoryRef.current : ''
    const updateDir = await fetchReq({
      url: `http://localhost:5000/api/files?parent=${idDir}${cat}`
    })

    if (updateDir.files) {
      setDir(updateDir.files)
    }

    if (updateDir.path) {
      setPath(updateDir.path)
    }
  }

  useEffect(() => {
    async function getQueryParams() {
      setLoading(true)
      const parent = queryParams.get("parent")
      categoryRef.current = queryParams.get("category") ? queryParams.get("category") : 'main'

      if (!parent) {
        await changeDir(userData.rootId)
      } else {
        await changeDir(parent)
      }
      setLoading(false)
    }
    getQueryParams()
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
      <Header />
      <div className="pageBodyMain">
        <ModalProvider>
          {categoryRef.current === 'main' && <TopPanel path={path} changeDir={changeDir} /> }
          <TitlePage currentDir={path[path.length - 1]} category={category} />
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

export default MainPage;
