import React, {useContext} from "react"
import linkImg from "../../images/link.svg"
import { ModalContext, NotifyContext } from "../../Context"

function Share({items}) {
    const {createNotification} = useContext(NotifyContext)
    const {closeModal} = useContext(ModalContext)

    const text = "test text"

    const handleShareBtn = () => {
        navigator.clipboard.writeText(text).then(() => {
            createNotification({
                title: `Буфер обмена`, 
                message: `Ссылка успешно скопирована в буфер обмена`
            })
        }, (err) => {
            console.error('Async: Could not copy text: ', err);
        });
    }

    return (
        <>
            <div style={{display: 'flex', alignItems: "center"}}>
                <input type="text" value={"link for " + items[0].name} onChange={(e) => e.preventDefault()} />
                <div className="imgBtn" style={{backgroundImage: `url(${linkImg})`, marginLeft: 5}} onClick={handleShareBtn}></div>
            </div>
        </>
    )
}

export default Share