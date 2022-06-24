const fs = require("fs")
const path = require("path")
const File = require("../models/File")

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
}

module.exports = new FileService()