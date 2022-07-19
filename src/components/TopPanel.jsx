import React, { useContext } from "react";

import '../styles/TopPanel.css'
import Button from "./UI/button/Button";

import Path from "./Path"

import { ModalContext } from '../Context'

function TopPanel(props) {
    const inputFile = React.createRef()
    const modal = useContext(ModalContext)

    const createFolder = () => {
        modal.setTypeModal('createFolder')
        modal.setModal(true)
    }

    const uploadFiles = () => {
        inputFile.current.click()
    }

    const showFilesList = (e) => {
        const list = Array.from(e.target.files)
        e.target.value = null;
        if (!list.length) return
        
        modal.setTypeModal('uploadFiles')
        modal.setDataModal(list)
        modal.setModal(true)
    }

    return (
        <div className="top-panel">
            <Path path={props.path} changeDir={props.changeDir} />
            <div className="buttons">
                <Button click={createFolder}>Создать папку</Button>
                <Button click={uploadFiles}>Загрузить</Button>
            </div>
            <input type="file" multiple style={{display: 'none'}} ref={inputFile} onChange={(e) => showFilesList(e)} />
        </div>
    )
}

export default TopPanel