import React from "react"
import { useDispatch } from "react-redux"

import CreateFolder from '../modalwindows/CreateFolder'
import UploadFiles from '../modalwindows/UploadFiles'
import Button from "../UI/button/Button"
import Path from "./components/Path"

import { openModal } from "../../store/modalWindowReducer"

import './TopPanel.scss'

function TopPanel({path}) {
    const inputFile = React.createRef()
    const dispatch = useDispatch()

    const createFolder = () => {
        dispatch(openModal({
            title: 'Создание папки',
            children: <CreateFolder />
        }))
    }

    const uploadFiles = () => {
        inputFile.current.click()
    }

    const showFilesList = (e) => {
        const listFiles = Array.from(e.target.files)
        e.target.value = null;
        if (!listFiles.length) return
        
        dispatch(openModal({
            title: 'Загрузка файлов',
            children: <UploadFiles files={listFiles} />
        }))
    }

    return (
        <div className="top-panel">
            { !!path.length && <Path path={path} /> }
            <div className="buttons">
                <Button click={createFolder}>Создать папку</Button>
                <Button click={uploadFiles}>Загрузить</Button>
            </div>
            <input type="file" multiple style={{display: 'none'}} ref={inputFile} onChange={(e) => showFilesList(e)} />
        </div>
    )
}

export default TopPanel