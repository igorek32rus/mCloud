const FileService = require("../services/fileService")
const User = require("../models/User")
const File = require("../models/File")

const getPath = async (parent, userId) => {
    let path = []
    const _path = async (cur) => {
        if (!cur.parent) return

        const newParent = await File.findOne({user: userId, _id: cur.parent})
        path.unshift(newParent)
        await _path(newParent)
    }

    const current = await File.findOne({user: userId, _id: parent})
    path.unshift(current)
    await _path(current)
    return path
}

const recursiveDeleteFiles = async (files) => {
    if (!files.length) return {countDeleted: 0, sizeDeleted: 0}

    let count = 0
    let size = 0

    try {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (file.type === 'folder') {
                const {countDeleted} = await recursiveDeleteFiles(await File.find({parent: file._id}))
                count += countDeleted
            }
    
            const fileDB = await File.findOne({_id: file._id})
            await File.deleteOne({_id: file._id})
            size += fileDB.size
            count++
        }
        return {countDeleted: count, sizeDeleted: size}
    } catch (error) {
        console.log('Error delete files');
    }
}

const recursiveUpdateSizeParent = async (userId, parent, size) => {
    if (!parent) return

    try {
        const parentDB = await File.findOne({user: userId, _id: parent})
        parentDB.size += size
        await parentDB.save()
        await recursiveUpdateSizeParent(userId, parentDB.parent, size)
    } catch (error) {
        console.log(error);
    }
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

            const fileExist = await File.findOne({user: req.user.id, parent, name})
            
            if (fileExist) {
                return res.status(400).json({message: '?????????? ?? ?????????? ???????????? ?????? ???????????????????? ?? ???????????? ????????????????????'})
            }

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
            const path = await getPath(req.query.parent, req.user.id)
            // const path = []
            return res.json({path, files})
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Can`t get files'})
        }
    }

    async renameFile(req, res) {
        try {
            const {name, id} = req.body
            const file = await File.findOne({user: req.user.id, _id: id})

            if (file) {
                file.name = name
                await file.save()
                return res.json({file})
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Can`t rename file/folder'})
        }
    }

    async deleteFiles(req, res) {
        try {
            const {files} = req.body
            const parent = files[0].parent
            const {countDeleted, sizeDeleted} = await recursiveDeleteFiles(files)
            await recursiveUpdateSizeParent(req.user.id, parent, -sizeDeleted)
            const dirFiles = await File.find({user: req.user.id, parent})
            return res.json({count: countDeleted, files: dirFiles})
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Can`t delete files'})
        }
    }

    async uploadFile(req, res) {
        try {
            const {file} = req.files
            const {fileName} = req.body
            const fileExist = await File.findOne({user: req.user.id, parent: req.body.parent, name: fileName})
            
            if (fileExist) {
                return res.status(400).json({message: '???????? ?? ?????????? ???????????? ?????? ???????????????????? ?? ???????????? ??????????'})
            }

            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})

            if (!parent) {
                return res.status(400).json({message: '???????????????? ??????????????????????'})
            }

            const dbFile = new File({
                name: fileName,
                type: 'file',
                size: file.size,
                parent: parent._id,
                user: req.user.id
            })

            await FileService.uploadFile(file, dbFile)
            await dbFile.save()
            await recursiveUpdateSizeParent(req.user.id, dbFile.parent, dbFile.size)

            return res.json({file: dbFile})
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Upload error'})
        }
    }

    async changeParent(req, res) {
        try {
            const {idNewParent, files, curDir} = req.body

            let sizeToParent = 0

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const dbFile = await File.findOne({ _id: file, user: req.user.id })
                sizeToParent += dbFile.size
                dbFile.parent = idNewParent
                await dbFile.save()   
            }

            await recursiveUpdateSizeParent(req.user.id, idNewParent, sizeToParent)

            const dirFiles = await File.find({user: req.user.id, parent: curDir })
            return res.json({files: dirFiles})
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: 'Can`t delete files'})
        }
    }
}

module.exports = new FileController()