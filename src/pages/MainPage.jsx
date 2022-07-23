import React, { useState, useContext, useEffect, useMemo, useRef } from 'react'

import TopPanel from '../components/TopPanel'
import TitlePage from '../components/TitlePage'
import DirContent from '../components/DirContent'
import Modal from '../components/UI/modal/Modal'
import Loader from '../components/UI/loader/Loader'

import '../styles/App.css'
import CreateFolder from '../components/modalwindows/CreateFolder'
import UploadFiles from '../components/modalwindows/UploadFiles'

import { ModalContext, AuthContext, NotifyContext, LoaderContext } from '../Context'
import Rename from '../components/modalwindows/Rename'
import Share from '../components/modalwindows/Share'
import Delete from '../components/modalwindows/Delete'

import fetchReq from '../utils/fetchReq'
import axios from 'axios'
import useQuery from '../hooks/useQuery'
import { useHistory } from 'react-router-dom'

function MainPage() {
  const {userData} = useContext(AuthContext)
  const {createNotification, removeNotification} = useContext(NotifyContext)
  const {loading, setLoading} = useContext(LoaderContext)

  const [modal, setModal] = useState(false)
  const [typeModal, setTypeModal] = useState('createFolder')
  const [dataModal, setDataModal] = useState([])

  const [dir, setDir] = useState([])
  const [path, setPath] = useState([])

  const dirRef = useRef(dir)

  const queryParams = useQuery()
  // const history = useHistory()

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
    // if (idDir === userData.rootId) {
    //   history.push(`/files${category !== 'main' ? `?category=${category}` : ''}`)
    //   return
    // }
    // history.push(`/files${category !== 'main' ? `?category=${category}&` : '?'} parent=${idDir}`)
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

  const createFolder = async (name) => {
    name = name.trim()
    if (!name) {
      createNotification({
        title: `Ошибка создания папки`, 
        message: `Имя папки не может быть пустым`
      })
      return
    }

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
        return
      }

      createNotification({
        title: `Ошибка создания папки`, 
        message: `${newFolder.message}`
      })
    } catch (error) {
      console.log(error)
    }
    
  }

  const renameItem = async (id, name) => {
    name = name.trim()
    if (!name) {
      createNotification({
        title: `Ошибка переименования`, 
        message: `Имя не может быть пустым`
      })
      return
    }

    try {
      const updatedFile = await fetchReq({
        url: 'http://localhost:5000/api/files/rename', 
        method: 'POST', 
        data: {name, id}
      })

      if (updatedFile.file) {
        const tempDir = dir.filter((item) => item._id !== id)
        setDir([...tempDir, updatedFile.file])
        createNotification({
          title: `Переименование ${ updatedFile.file.type === 'folder' ? 'папки' : 'файла'}`, 
          message: `Новое имя ${ updatedFile.file.type === 'folder' ? 'папки' : 'файла'} - ${updatedFile.file.name}`
        })
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  const deleteItems = async (files) => {
    // const files = dir.filter((item) => itemsId.includes(item._id))
    // setDir(newDir)
    try {
      const updatedDir = await fetchReq({
        url: 'http://localhost:5000/api/files/delete', 
        method: 'POST', 
        data: {files}
      })

      if (updatedDir.files) {
        setDir(updatedDir.files)
        createNotification({
          title: `Удаление объектов`, 
          message: `Объекты успешно удалены (${updatedDir.count})`
        })
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  const uploadFiles = async (files) => {
    const idNotification = createNotification({
      title: `Загрузка файлов`, 
      message: `Подождите, выполняется загрузка файлов`,
      time: 0
    })

    const errorFlag = false
    dirRef.current = dir
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('parent', path[path.length - 1]._id)
        formData.append('fileName', file.name)
        const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
          headers: {
            Authorization: `Baerer ${localStorage.getItem('token')}`
          },
          onUploadProgress: progressEvent => {
            // console.log(progressEvent.loaded);
          }
        })
        dirRef.current = [...dirRef.current, response.data.file]

      } catch (error) {
        createNotification({
          title: `Ошибка загрузки файла`, 
          message: `Файл: ${file.name}. ${error.response.data.message}`
        })
        return
      }
    }

    removeNotification(idNotification)

    setDir(dirRef.current)
    createNotification({
      title: `Загрузка файлов`, 
      message: `Файлы успешно загружены`
    })
  }

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

  const modalSelector = (type) => {
    switch (type) {
      case 'createFolder':
        return <CreateFolder createFolder={createFolder} />
      
      case 'uploadFiles':
        return <UploadFiles files={dataModal} uploadFiles={uploadFiles} />
      
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
    loading ? <Loader /> : 

    <div className="pageBodyMain">
      <ModalContext.Provider value={{setModal, setTypeModal, setDataModal}}>
        { modal &&
          <Modal>
            {modalSelector(typeModal)}
          </Modal>
        }
        <>
          {category === 'main' && <TopPanel path={path} changeDir={changeDir} /> }
          <TitlePage currentDir={path[path.length - 1]} />
          <DirContent dir={dir} currentDir={path[path.length - 1]} changeDir={changeDir} changeParent={changeParent} />
        </>
        
      </ModalContext.Provider>
    </div>
  );
}

export default MainPage;
