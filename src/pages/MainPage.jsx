import React, { useState } from 'react';

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

import { ModalContext } from '../Context'
import Rename from '../components/modalwindows/Rename';
import Share from '../components/modalwindows/Share';
import Delete from '../components/modalwindows/Delete';

function MainPage() {
  const [modal, setModal] = useState(false)
  const [typeModal, setTypeModal] = useState('createFolder')
  const [dataModal, setDataModal] = useState(null)

  const [dir, setDir] = useState([
    {
      id: 111,
      type: 'folder',
      name: 'test',
      parent: 'root',
      date: new Date(),
      link: 'https://igorek.xyz',
      size: 252
    },
    {
      id: 121,
      type: 'file',
      name: 'testFile.txt',
      parent: 'root',
      date: new Date(),
      link: 'https://igorek.xyz',
      size: 252
    }
  ])

  const createFolder = (name) => {
    const folder = {
      id: new Date(),
      type: 'folder',
      name: name,
      parent: 'root',
      date: new Date(),
      link: 'https://igorek.xyz',
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

  const deleteItem = (id) => {
    setDir(dir.filter((item) => item.id !== id))
  }

  return (
    <div className="pageBody">
      <ModalContext.Provider value={{setModal, setTypeModal, setDataModal}}>
        { modal &&
            <Modal>
              {typeModal === 'createFolder' && <CreateFolder createFolder={createFolder} /> }
              {typeModal === 'uploadFiles' && <UploadFiles files={dataModal} /> }
              {typeModal === 'rename' && <Rename item={dataModal} renameItem={renameItem} /> }
              {typeModal === 'share' && <Share item={dataModal} /> }
              {typeModal === 'delete' && <Delete item={dataModal} deleteItem={deleteItem} /> }
            </Modal>
        }
        <Header />
        <TopPanel />
        <TitlePage />
        <DirContent dir={dir} />
        <Notify />
        <Footer />
      </ModalContext.Provider>
    </div>
  );
}

export default MainPage;
