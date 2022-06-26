const FileService = require("../services/fileService")
const User = require("../models/User")
const File = require("../models/File")

const getPath = async (parent, userId) => {
    let path = []
    const _path = async (parent) => {
        if (!parent) return

        const newParent = await File.findOne({user: userId, _id: parent})
        path.push(newParent)
        await _path(newParent)
    }
    await _path(parent)
    return path
}

class FileController {
    async createUserRootDir(userId) {
        try {
            // const {name, type, parent} = req.body
            const file = new File({
                name: 'Root',
                type: 'folder',
                parent: null,
                user: userId
            })
            const rootDir = await File.findOne({parent: null, user: userId})
            
            if (!rootDir) {
                await FileService.createUserRootDir(file)
                await file.save()
                // return res.status(200).json({message: 'Root dir was created'})
                return
            }
        } catch (error) {
            console.log(error)
            // return res.status(400).json({error})
            return
        }
    }

    async createDir(req, res) {
        try {
            const {name, parent} = req.body
            const file = new File({
                name,
                type: 'folder',
                parent,
                user: req.user.id
            })
            const parentFile = await File.findOne({_id: parent})

            if (parentFile) {
                parentFile.childs.push(file._id)
                await parentFile.save()
                await file.save()
                return res.json({file})
            }
            return res.status(400).json({error: 'Parent not found'})

        } catch (error) {
            console.log(error);
            return res.status(400).json({error})
        }
    }

    async getFiles(req, res) {
        try {
            const files = await File.find({user: req.user.id, parent: req.query.parent})
            // const path = await getPath(req.query.parent, req.user.id)
            const path = []
            return res.json({path, files})
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Can`t get files'})
        }
    }
}

module.exports = new FileController()