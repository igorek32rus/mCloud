import React, { useState, useContext } from 'react';

import Header from "../components/Header";
import TopPanel from '../components/TopPanel';
import TitlePage from '../components/TitlePage';
import DirContent from '../components/DirContent';
import Notify from '../components/Notify';
import Footer from '../components/Footer';
import Modal from '../components/UI/modal/Modal';

import '../styles/App.css'
import CreateFolder from '../components/modalwindows/CreateFolder';
import UploadFiles from '../components/modalwindows/UploadFiles';

import { ModalContext, AuthContext } from '../Context'
import Rename from '../components/modalwindows/Rename';
import Share from '../components/modalwindows/Share';
import Delete from '../components/modalwindows/Delete';

import getData from '../data/mock_dir';

function MainPage() {
  const {userData} = useContext(AuthContext)

  const [modal, setModal] = useState(false)
  const [typeModal, setTypeModal] = useState('createFolder')
  const [dataModal, setDataModal] = useState([])

  const [currentDir, setCurrentDir] = useState({ name: 'Главная', link: 'root' })

  const [dir, setDir] = useState(getData(currentDir.link, 5, 30))

  const createFolder = (name) => {
    const folder = {
      id: new Date(),
      type: 'folder',
      name: name,
      parent: currentDir.link,
      date: new Date(),
      link: 'folder_hash',
      size: 0
    }
    const newDir = [...dir, folder]

    setDir(newDir)
  }

  const renameItem = (id, newName) => {
    const tempDir = dir.filter((item) => item.id !== id)
    const tempItem = dir.find((item) => item.id === id)

    tempItem.name = newName
    setDir([...tempDir, tempItem])
  }

  const deleteItems = (itemsId) => {
    setDir(dir.filter((item) => !itemsId.includes(item.id)))
  }

  const updateDir = (link) => {
    if (link !== 'root') {
      setCurrentDir({ name: 'Папка', link })
      setDir(getData(link, 3, 10))
      return
    }
    setCurrentDir({ name: 'Главная', link })
    setDir(getData(link, 5, 30))
  }

  return (
    <div className="pageBody">
      <ModalContext.Provider value={{setModal, setTypeModal, setDataModal}}>
        { modal &&
            <Modal>
              {typeModal === 'createFolder' && <CreateFolder createFolder={createFolder} /> }
              {typeModal === 'uploadFiles' && <UploadFiles files={dataModal} /> }
              {typeModal === 'rename' && <Rename items={dataModal} renameItem={renameItem} /> }
              {typeModal === 'share' && <Share items={dataModal} /> }
              {typeModal === 'delete' && <Delete items={dataModal} deleteItems={deleteItems} /> }
            </Modal>
        }
        <Header />
        <TopPanel currentDir={currentDir} updateDir={updateDir} />
        <TitlePage currentDir={currentDir} />
        <DirContent dir={dir} currentDir={currentDir} updateDir={updateDir} />
        <Notify />
        <Footer />
      </ModalContext.Provider>
    </div>
  );
}

export default MainPage;
