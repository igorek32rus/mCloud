import React, { useContext } from "react";
import { ModalContext } from "../../Context";
import Button from "../UI/button/Button";

function Delete(props) {
    const {setModal} = useContext(ModalContext)

    const handleDeleteBtn = () => {
        // const itemsId = props.items.reduce((prev, cur) => {return [...prev, cur.id]}, [])
        // props.deleteItems(itemsId)
        props.deleteItems(props.items)
        setModal(false)
    }

    return (
        <div className="modal_content" style={{display: 'flex', flexDirection: 'column'}}>
            <h1>Удалить</h1>
            <p style={{margin: '10px 0'}}>Вы действительно хотите удалить выбранные файлы?</p>
            <div className="buttons">
                <Button click={() => setModal(false)} style={{width: '100%'}} >Отмена</Button>
                <Button click={handleDeleteBtn} className={"btn red"} style={{width: '100%'}} >Удалить</Button>
            </div>
        </div>
    )
}

export default Delete