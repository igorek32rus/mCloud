import React, { useContext } from "react";

import '../styles/TopPanel.css'
import Button from "./UI/button/Button";

import Path from "./Path"

import CreateFolder from './modalwindows/CreateFolder'
import UploadFiles from './modalwindows/UploadFiles'

// import { ModalContext } from '../Context'
import { ModalContext } from "../contexts/ModalContext/ModalContext";

function TopPanel({path, changeDir}) {
    const inputFile = React.createRef()
    const {openModal} = useContext(ModalContext)

    const createFolder = () => {
        openModal({
            title: 'Создание папки',
            children: <CreateFolder currentDir={path[path.length - 1]} changeDir={changeDir} />
        })
    }

    const uploadFiles = () => {
        inputFile.current.click()
    }

    const showFilesList = (e) => {
        const listFiles = Array.from(e.target.files)
        e.target.value = null;
        if (!listFiles.length) return
        
        openModal({
            title: 'Загрузка файлов',
            children: <UploadFiles files={listFiles} currentDir={path[path.length - 1]} changeDir={changeDir} />
        })
    }

    return (
        <div className="top-panel">
            <Path path={path} changeDir={changeDir} />
            <div className="buttons">
                <Button click={createFolder}>Создать папку</Button>
                <Button click={uploadFiles}>Загрузить</Button>
            </div>
            <input type="file" multiple style={{display: 'none'}} ref={inputFile} onChange={(e) => showFilesList(e)} />
        </div>
    )
}

export default TopPanel