const fs = require("fs")
const path = require("path")

class FileService {
    getFilePath(userId, fileId) {
        return path.join(__dirname, '../files/', userId.toString(), fileId.toString())
    }

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

    getFile(user, file) {
        return fs.readFileSync(this.getFilePath(user, file))
    }

    copyFile(user, fileSource, fileTarget) {
        return new Promise((resolve, reject) => {
            const sourcePath = this.getFilePath(user, fileSource)
            const targetPath = this.getFilePath(user, fileTarget)

            try {
                if (fs.existsSync(sourcePath)) {
                    fs.copyFileSync(sourcePath, targetPath);
                    return resolve({message: 'File copied'})
                }

                return reject({message: 'File already exist'})
            } catch (error) {
                return reject({message: 'Error copy file'})
            }
        })
    }
}

module.exports = new FileService()