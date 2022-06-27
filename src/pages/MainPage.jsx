import React, { useState, useContext, useEffect, useMemo } from 'react'

import Header from "../components/Header"
import TopPanel from '../components/TopPanel'
import TitlePage from '../components/TitlePage'
import DirContent from '../components/DirContent'
import Notify from '../components/Notify'
import Footer from '../components/Footer'
import Modal from '../components/UI/modal/Modal'

import '../styles/App.css'
import CreateFolder from '../components/modalwindows/CreateFolder'
import UploadFiles from '../components/modalwindows/UploadFiles'

import { ModalContext, AuthContext, NotifyContext } from '../Context'
import Rename from '../components/modalwindows/Rename'
import Share from '../components/modalwindows/Share'
import Delete from '../components/modalwindows/Delete'

import getData from '../data/mock_dir'
import fetchReq from '../utils/fetchReq'

function MainPage() {
  const {userData} = useContext(AuthContext)
  const {createNotification} = useContext(NotifyContext)

  const [modal, setModal] = useState(false)
  const [typeModal, setTypeModal] = useState('createFolder')
  const [dataModal, setDataModal] = useState([])

  const [currentDir, setCurrentDir] = useState(null)

  const [loading, setLoading] = useState(true)

  // const [dir, setDir] = useState(getData(currentDir.link, 5, 30))
  const [dir, setDir] = useState([])
  const [path, setPath] = useState([])



  useEffect(async () => {
    setLoading(true)
    const updateDir = await fetchReq({
      url: `http://localhost:5000/api/files?parent=${userData.rootId}`
    })
    setDir(updateDir.files)
    setPath(updateDir.path)
    setCurrentDir(updateDir.path[0])
    setLoading(false)
  }, [])

  const createFolder = async (name) => {
    try {
      const newFolder = await fetchReq({
        url: 'http://localhost:5000/api/files/dir/create', 
        method: 'POST', 
        data: {name, parent: currentDir._id}
      })

      if (newFolder.file) {
        const newDir = [...dir, newFolder.file]

        setDir(newDir)
        createNotification({title: 'Создание папки', message: `Папка (${name}) успешно создана`})  
      }
      
    } catch (error) {
      console.log(error);
    }
    
  }

  const renameItem = (id, newName) => {
    const tempDir = dir.filter((item) => item.id !== id)
    const tempItem = dir.find((item) => item.id === id)

    tempItem.name = newName
    setDir([...tempDir, tempItem])
    createNotification({
      title: `Переименование ${ tempItem.type === 'folder' ? 'папки' : 'файла'}`, 
      message: `Новое имя ${ tempItem.type === 'folder' ? 'папки' : 'файла'} - ${newName}`
    })
  }

  const deleteItems = (itemsId) => {
    const countBefore = dir.length
    const newDir = dir.filter((item) => !itemsId.includes(item.id))
    setDir(newDir)
    createNotification({
      title: `Удаление объектов`, 
      message: `Количество удалённых объектов - ${countBefore - newDir.length}`
    })
  }

  const updateDir = (link) => {
    if (link !== 'root') {
      setCurrentDir({ name: 'Папка', link })
      // setDir(getData(link, 3, 10))
      return
    }
    setCurrentDir({ name: 'Главная', link })
    // setDir(getData(link, 5, 30))
  }

  const modalSelector = (type) => {
    switch (type) {
      case 'createFolder':
        return <CreateFolder createFolder={createFolder} />
      
      case 'uploadFiles':
        return <UploadFiles files={dataModal} />
      
      case 'rename':
        return <Rename items={dataModal} renameItem={renameItem} />
        
      case 'share':
        return <Share items={dataModal} />

      case 'delete':
        return <Delete items={dataModal} deleteItems={deleteItems} />

      default:
        break;
    }
  }

  return (
    <div className="pageBodyMain">
      <ModalContext.Provider value={{setModal, setTypeModal, setDataModal}}>
        { modal &&
          <Modal>
            {modalSelector(typeModal)}
          </Modal>
        }
        {!loading && (
          <>
            <TopPanel currentDir={currentDir} updateDir={updateDir} />
            <TitlePage currentDir={currentDir} />
            <DirContent dir={dir} currentDir={currentDir} updateDir={updateDir} />
          </>
        )}
        
      </ModalContext.Provider>
    </div>
  );
}

export default MainPage;
