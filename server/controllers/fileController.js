const FileService = require("../services/fileService")
const User = require("../models/User")
const File = require("../models/File")

class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File({
                name,
                type,
                parent,
                user: user.id
            })
            const parentFile = await file.findOne({_id: parent})
            
            if (!parentFile) {
                // file.path = name
                await FileService.createDir(file)
                return
            }

        } catch (error) {
            console.log(error)
            return res.status(400).json({error})
        }
    }
}

module.exports = new FileController()