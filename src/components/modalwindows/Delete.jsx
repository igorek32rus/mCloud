import React, { useContext } from "react";
import { ModalContext } from "../../Context";
import Button from "../UI/button/Button";

function Delete(props) {
    const {setModal} = useContext(ModalContext)

    const handleDeleteBtn = () => {
        props.deleteItem(props.item.id)
        setModal(false)
    }

    return (
        <div className="modal_content" style={{display: 'flex', flexDirection: 'column'}}>
            <h1>Удалить</h1>
            <p style={{margin: '10px 0'}}>Вы действительно хотите удалить {props.item.type === 'file' ? 'файл' : 'папку' }?</p>
            <div style={{display: 'flex'}}>
                <Button click={handleDeleteBtn} style={{margin: 0, width: '100%', marginRight: 5}}>Удалить</Button>
                <Button click={() => setModal(false)} style={{margin: 0, width: '100%'}}>Отмена</Button>
            </div>
        </div>
    )
}

export default Delete