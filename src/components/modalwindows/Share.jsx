import React from "react"

import { URLS } from "../../constants"
import useFetch from "../../hooks/useFetch"
import useNotification from "../../hooks/useNotification"

import copyImg from "../../images/copy.svg"
import linkCloseImg from "../../images/link_slash.svg"

function Share({items}) {
    const [inputLink, setInputLink] = React.useState("")
    const [createNotification] = useNotification()

    const fetch = useFetch()

    const handleShareBtn = () => {
        navigator.clipboard.writeText(inputLink).then(() => {
            createNotification({
                title: `Буфер обмена`, 
                message: `Ссылка успешно скопирована в буфер обмена`
            })
        }, (err) => {
            console.error('Async: Could not copy text: ', err);
        });
    }

    const handleToggleShare = async () => {
        const fileInfo = await fetch({
            url: URLS.TOGGLE_SHARE, 
            method: 'POST', 
            data: {fileID: items[0]._id}
        })

        if (fileInfo.link) {
            setInputLink(URLS.SHARE + "/" + fileInfo.link)
            return
        }

        setInputLink("Общий доступ к файлу закрыт")
    }

    const getShareInfoFile = React.useCallback(async () => {
        const reqParams = [{
            name: "fileID",
            value: items[0]._id
        }]

        const fileInfo = await fetch({
            url: URLS.SHARE_INFO,
            reqParams
        })

        if (fileInfo.link) {
            setInputLink(URLS.SHARE + "/" + fileInfo.link)
            return
        }

        setInputLink("Общий доступ к файлу закрыт")
    }, [])

    React.useEffect(() => {
        getShareInfoFile()
    }, [getShareInfoFile])

    return (
        <>
            <div style={{display: 'flex', alignItems: "center"}}>
                <input type="text" value={inputLink} readOnly={true} />
                <div className="imgBtn" style={{backgroundImage: `url(${copyImg})`, marginLeft: 5}} onClick={handleShareBtn}></div>
                <div className="imgBtn" style={{backgroundImage: `url(${linkCloseImg})`, marginLeft: 5}} onClick={handleToggleShare}></div>
            </div>
        </>
    )
}

export default Share