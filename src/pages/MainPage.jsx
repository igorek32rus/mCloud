import React, { useState, useContext, useEffect, useMemo } from 'react'

import TopPanel from '../components/TopPanel'
import TitlePage from '../components/TitlePage'
import DirContent from '../components/DirContent'
import Modal from '../components/UI/modal/Modal'

import '../styles/App.css'
import CreateFolder from '../components/modalwindows/CreateFolder'
import UploadFiles from '../components/modalwindows/UploadFiles'

import { ModalContext, AuthContext, NotifyContext } from '../Context'
import Rename from '../components/modalwindows/Rename'
import Share from '../components/modalwindows/Share'
import Delete from '../components/modalwindows/Delete'

import fetchReq from '../utils/fetchReq'

function MainPage() {
  const {userData} = useContext(AuthContext)
  const {createNotification} = useContext(NotifyContext)

  const [modal, setModal] = useState(false)
  const [typeModal, setTypeModal] = useState('createFolder')
  const [dataModal, setDataModal] = useState([])

  const [loading, setLoading] = useState(true)

  const [dir, setDir] = useState([])
  const [path, setPath] = useState([])


  const changeDir = async (idDir) => {
    const updateDir = await fetchReq({
      url: `http://localhost:5000/api/files?parent=${idDir}`
    })
    console.log(updateDir.path);
    setDir(updateDir.files)
    setPath(updateDir.path)
  }

  useEffect(async () => {
    setLoading(true)
    await changeDir(userData.rootId)
    setLoading(false)
  }, [])

  const createFolder = async (name) => {
    try {
      const newFolder = await fetchReq({
        url: 'http://localhost:5000/api/files/dir/create', 
        method: 'POST', 
        data: {name, parent: path[path.length - 1]._id}
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

      case 'share_current':
        return <Share items={[path[path.length - 1]]} />

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
            <TopPanel path={path} changeDir={changeDir} />
            <TitlePage currentDir={path[path.length - 1]} />
            <DirContent dir={dir} currentDir={path[path.length - 1]} changeDir={changeDir} />
          </>
        )}
        
      </ModalContext.Provider>
    </div>
  );
}

export default MainPage;
