const fs = require("fs")
const path = require("path")

class FileService {
    createUserRootDir(file) {
        return new Promise((resolve, reject) => {
            const filePath = path.join(__dirname, '../files/', file.user.toString())
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'Dir created'})
                }

                return reject({message: 'Dir already exist'})
            } catch (error) {
                return reject({message: 'Error making dir'})
            }
        })
    }

    deleteFile(file) {
        return new Promise((resolve, reject) => {
            const filePath = path.join(__dirname, '../files/', file.user.toString(), file._id.toString())
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
                return resolve({message: 'File deleted'})       // не важно есть или нет файл
            } catch (error) {
                return reject({message: 'Error delete file'})
            }
        })
    }

    uploadFile(file, dbFile) {
        return new Promise((resolve, reject) => {
            const filePath = path.join(__dirname, '../files/', dbFile.user.toString(), dbFile._id.toString())
            try {
                if (!fs.existsSync(filePath)) {
                    file.mv(filePath)
                    return resolve({message: 'File uploaded'})
                }

                return reject({message: 'File already exist'})
            } catch (error) {
                return reject({message: 'Error delete file'})
            }
        })
    }
}

module.exports = new FileService()