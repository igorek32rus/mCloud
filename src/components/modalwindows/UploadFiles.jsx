import React, {useContext, useState} from "react"
import Button from "../UI/button/Button"
import { ModalContext, NotifyContext, AuthContext } from "../../Context"
import { getFileSize } from "../../utils/getFileSize"
import { URLS } from "../../constants"
import { DirContext } from "../../contexts/DirContext/DirContext"
import { useParams } from "react-router-dom"

import axios from 'axios'

function UploadFiles({files}) {
    const [uploadFiles, setUploadFiles] = useState(files)
    const {closeModal} = useContext(ModalContext)
    const {createNotification, removeNotification, updateNotification} = useContext(NotifyContext)
    const {setUserData} = useContext(AuthContext)
    const {setDir} = useContext(DirContext)
    const {parent} = useParams()

    const handleUploadFilesBtn = async () => {
        closeModal()

        const idNotification = createNotification({
            title: `Загрузка файлов`, 
            message: `Подождите, выполняется загрузка файлов`,
            time: 0
        })

        const sizeAllFiles = files.reduce((prev, cur) => prev + cur.size, 0)
        let sizeUploaded = 0
        // console.log('All size: ' + sizeAllFiles);
        const onePersent = sizeAllFiles / 100
        // console.log('1 persent: ' + onePersent);
    
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            try {
                const formData = new FormData()
                formData.append('file', file)
                formData.append('parent', parent)
                formData.append('fileName', file.name)
                const response = await axios.post(URLS.UPLOAD_FILE, formData, {
                    headers: {
                        Authorization: `Baerer ${localStorage.getItem('token')}`
                    },
                    onUploadProgress: progressEvent => {
                        // console.log((sizeUploaded + progressEvent.loaded) / onePersent + "%");
                        updateNotification(idNotification, {
                            message: 'Загрузка ' + Math.round((sizeUploaded + progressEvent.loaded) / onePersent) + "%"
                        })
                    }
                })
                setUserData((prev) => {
                    return {...prev, usedSpace: response.data.usedSpace}
                })
                setDir(dir => [...dir, response.data.file])

                sizeUploaded += file.size
                // console.log(sizeUploaded / onePersent + "%");
                updateNotification(idNotification, {
                    message: 'Загрузка ' + Math.round(sizeUploaded / onePersent) + "%"
                })
            } catch (error) {
                console.log(error);
                createNotification({
                    title: `Ошибка загрузки файла`, 
                    message: `Файл: ${file.name}. ${error.response.data.message}`
                })
                return
            }
        }

        // console.log('Uploaded size: ' + sizeUploaded);
    
        removeNotification(idNotification)
    
        createNotification({
            title: `Загрузка файлов`, 
            message: `Файлы успешно загружены`
        })
            
    }

    const handleRemoveFile = (num) => {
        let copyUploadFiles = uploadFiles.slice(0)
        copyUploadFiles.splice(num, 1)
        setUploadFiles(copyUploadFiles)

        if (!copyUploadFiles.length) closeModal()
    }

    return (
        <>
            <div className="list_upload">
                <table>
                    <tbody>
                        <tr>
                            <th>Имя файла</th>
                            <th>Размер</th>
                            <th></th>
                        </tr>
                        {uploadFiles.map((file, i) => <tr key={i}><td>{file.name}</td><td>{getFileSize(file.size)}</td><td onClick={() => handleRemoveFile(i)} className="removeUpload">&times;</td></tr> )}
                    </tbody>
                </table>
            </div>
            
            <div className="buttons">
                <Button click={closeModal} style={{width: '100%'}} >Отмена</Button>
                <Button click={handleUploadFilesBtn} className={"btn blue"} style={{width: '100%'}}>Загрузить</Button>
            </div>
        </>
    )
}

export default UploadFiles