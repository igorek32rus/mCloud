const fs = require("fs")
const path = require("path")
const File = require("../models/File")

class FileService {
    createDir(file) {
        return new Promise((resolve, reject) => {
            const filePath = path.join(__dirname, file.user)
            try {
                if (!fs.existsSync(filePath)) {

                }
            } catch (error) {
                return reject({message: 'File error'})
            }
        })
    }
}

module.exports = new FileService()