import React, { useContext, useState } from "react";
import { ModalContext } from "../../Context";
import Button from "../UI/button/Button";

function CreateFolder(props) {
    const [nameFolder, setNameFolder] = useState('')
    const {setModal} = useContext(ModalContext)

    const submit = () => {
        props.createFolder(nameFolder)
        setModal(false)
    }

    return (
        <div className="modal_content" style={{display: 'flex', flexDirection: 'column'}}>
            <h1>Имя новой папки</h1>
            <input type="text" placeholder="Новая папка" value={nameFolder} onChange={(e) => setNameFolder(e.target.value)} />
            <Button click={submit} style={{margin: 0}}>Создать папку</Button>
        </div>
    )
}

export default CreateFolder