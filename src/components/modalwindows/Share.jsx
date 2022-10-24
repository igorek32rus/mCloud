import React from "react"

import { URLS } from "../../constants"
import useFetch from "../../hooks/useFetch"
import useNotification from "../../hooks/useNotification"

import linkCloseImg from "../../images/link_slash.svg"
import linkImg from "../../images/link.svg"

function Share({items}) {
    const [inputLink, setInputLink] = React.useState("")
    const [shared, setShared] = React.useState(false)
    const [createNotification] = useNotification()

    const fetch = useFetch()

    const handleShareBtn = () => {
        if (!shared) return

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
            setShared(true)
            return
        }

        setInputLink("Общий доступ к файлу закрыт")
        setShared(false)
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
            setShared(true)
            return
        }

        setInputLink("Общий доступ к файлу закрыт")
        setShared(false)
    }, [])

    React.useEffect(() => {
        getShareInfoFile()
    }, [getShareInfoFile])

    return (
        <>
            <div style={{display: 'flex', alignItems: "center"}}>
                <input type="text" className="share_input" value={inputLink} readOnly={true} onClick={handleShareBtn} />
                <div className="button_share" style={{backgroundImage: `url(${shared ? linkCloseImg : linkImg})`, marginLeft: 5}} onClick={handleToggleShare}></div>
            </div>
        </>
    )
}

export default Share