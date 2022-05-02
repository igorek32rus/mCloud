import React, { useContext } from "react";

import '../styles/TopPanel.css'
import Button from "./UI/button/Button";

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

    const showFilesList = (list) => {
        modal.setTypeModal('uploadFiles')
        modal.setDataModal(list)
        modal.setModal(true)
    }

    return (
        <div className="top-panel">
            <div className="path">
                <a href="/" style={{padding: 3}}>
                    <div className="home"></div>
                </a>
                <div className="delimiter">&#10140;</div>
                <a href="/">Папка</a>
            </div>

            <Button click={createFolder}>Создать папку</Button>
            <Button click={uploadFiles}>Загрузить</Button>
            <input type="file" style={{display: 'none'}} ref={inputFile} onChange={(e) => showFilesList(e.target.files)} />
        </div>
    )
}

export default TopPanel