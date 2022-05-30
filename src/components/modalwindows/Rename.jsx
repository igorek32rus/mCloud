import React, { useContext, useState } from "react";
import { ModalContext } from "../../Context";
import Button from "../UI/button/Button";

function Rename(props) {
    const [newName, setNewName] = useState(props.items[0].name)

    const {setModal} = useContext(ModalContext)

    const handleRenameBtn = () => {
        props.renameItem(props.items[0].id, newName)
        setModal(false)
    }

    return (
        <div className="modal_content" style={{display: 'flex', flexDirection: 'column'}}>
            <h1>Переименовать</h1>
            <input type="text" placeholder="Новое имя" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <Button click={handleRenameBtn} style={{margin: 0}}>Переименовать</Button>
        </div>
    )
}

export default Rename