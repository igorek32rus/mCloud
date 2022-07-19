import React, {useContext, useState} from "react";
import Button from "../UI/button/Button";
import { ModalContext } from "../../Context";
import { getFileSize } from "../../utils/getFileSize";

function UploadFiles(props) {
    const [uploadFiles, setUploadFiles] = useState(props.files)
    const {setModal} = useContext(ModalContext)

    const handleUploadFilesBtn = () => {
        props.uploadFiles(uploadFiles)
        setModal(false)
    }

    const handleRemoveFile = (num) => {
        let copyUploadFiles = uploadFiles.slice(0)
        copyUploadFiles.splice(num, 1)
        setUploadFiles(copyUploadFiles)

        if (copyUploadFiles.length === 0) {
            setModal(false)
        }
    }

    return (
        <div className="modal_content" style={{display: 'flex', flexDirection: 'column'}}>
            <h1>Список файлов для загрузки</h1>
            <div className="list_upload">
                <table>
                    <tbody>
                        <tr>
                            <th>Имя файла</th>
                            <th>Размер</th>
                            <th></th>
                        </tr>
                        {uploadFiles.map((file, i) => <tr key={i}><td>{file.name}</td><td>{getFileSize(file.size)}</td><td onClick={() => handleRemoveFile(i)} className="removeUpload">&times;</td></tr> )}
                        {/* {Array.from(props.files).map((file) => <tr key={new Date() - file.size}><td>{file.name}</td><td>{file.size}</td><td className="removeUpload">&times;</td></tr>)} */}
                    </tbody>
                </table>
            </div>
            
            <div className="buttons">
                <Button click={() => setModal(false)} style={{width: '100%'}} >Отмена</Button>
                <Button click={handleUploadFilesBtn} className={"btn blue"} style={{width: '100%'}}>Загрузить</Button>
            </div>
        </div>
    )
}

export default UploadFiles