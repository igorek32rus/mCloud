const bcrypt = require("bcryptjs")

const JSZip = require("jszip")

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
    if (!files.length) return {count: 0, size: 0}

    let countDel = 0, sizeDel = 0

    try {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (file.type === 'folder') {
                const {count, size} = await recursiveDeleteFiles(await File.find({parent: file._id}))
                countDel += count
                sizeDel += size
            }
    
            const fileDB = await File.findOne({_id: file._id})
            if (file.type === 'file') {
                await FileService.deleteFile(file)
                sizeDel += fileDB.size
            }
            countDel++

            await File.deleteOne({_id: file._id})
        }
        return {count: countDel, size: sizeDel}
    } catch (error) {
        console.log('Error delete files')
    }
}

const recursiveMarkDeleteFiles = async (files) => {
    if (!files.length) return {countDeleted: 0, sizeDeleted: 0}

    let count = 0
    let size = 0

    try {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (file.type === 'folder') {
                const {countDeleted} = await recursiveMarkDeleteFiles(await File.find({parent: file._id}))
                count += countDeleted
            }
    
            const fileDB = await File.findOne({_id: file._id})
            fileDB.deleted = new Date()
            fileDB.accessLink = null
            await fileDB.save()
            size += fileDB.size
            count++
        }
        return {countDeleted: count, sizeDeleted: size}
    } catch (error) {
        console.log('Error delete files')
    }
}

const recursiveRestoreFiles = async (files) => {
    if (!files.length) return 0

    let size = 0

    try {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (file.type === 'folder') {
                size += await recursiveRestoreFiles(await File.find({parent: file._id}))
            }
    
            const fileDB = await File.findOne({_id: file._id})
            fileDB.deleted = null
            await fileDB.save()
            size += fileDB.size
        }
        return size
    } catch (error) {
        console.log('Error restore files')
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
        console.log(error)
    }
}

const recursiveGetTree = async (user, parent) => {
    let tree = {}
    if (!parent) return {}

    tree = {
        _id: parent._id,
        name: parent.parent ? parent.name : 'Главная',
        childs: []
    }

    try {
        const childFolders = await File.find({user, parent: parent._id, type: 'folder', deleted: null})
        if (!childFolders) return

        for (let i = 0; i < childFolders.length; i++) {
            const childFolder = childFolders[i]
            tree.childs.push(await recursiveGetTree(user, childFolder))
        }
    } catch (error) {
        console.log(error)
    }

    return tree
}

const getRootTrash = async (user) => {
    const files = await File.find({user, deleted: {$ne: null}, parent: {$ne: null}})
    let result = []
    
    for (let i = 0; i < files.length; i++) {
        const parent = await File.findOne({user, _id: files[i].parent})
        if (!parent.deleted) result.push(files[i])
    }

    return result
}

const recursiveZipFiles = async (zip, parent, files) => {
    if (!files.length) return zip

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileDB = await File.findOne({_id: file._id})
        
        if (fileDB.type === "file") {
            zip.file(parent + fileDB.name, FileService.getFile(fileDB.user, fileDB._id))
            continue
        }

        const filesFolder = await File.find({parent: fileDB._id})
        await recursiveZipFiles(zip, parent + fileDB.name + "/", filesFolder)
    }

    return zip
}

const recursiveCopyFiles = async (parent, files, user) => {
    if (!files.length) return 0

    let sizeResult = 0

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileDB = await File.findOne({_id: file, user})

        if (fileDB.type === "folder") {
            const newFolder = new File({
                name: fileDB.name,
                type: 'folder',
                size: fileDB.size,
                parent,
                user
            })
            await newFolder.save()

            const filesNewFolder = (await File.find({parent: file})).reduce((prev, cur) => [...prev, cur._id], [])
            sizeResult += await recursiveCopyFiles(newFolder._id, filesNewFolder, user)
            continue
        }

        const newFile = new File({
            name: fileDB.name,
            type: 'file',
            size: fileDB.size,
            parent,
            user
        })

        await FileService.copyFile(user, fileDB._id, newFile._id)
        await newFile.save()

        sizeResult += newFile.size
    }

    return sizeResult
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

            const fileExist = await File.findOne({user: req.user.id, parent, name, type: 'folder', deleted: null})
            
            if (fileExist) {
                return res.status(400).json({message: 'Папка с таким именем уже существует в данной директории'})
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
            console.log(error)
            return res.status(400).json({error})
        }
    }

    async getFiles(req, res) {
        try {
            const {category, parent} = req.query

            if (!parent) {
                return res.status(500).json({error: 'Can`t get files'})
            }

            let files = []

            if (category === 'latest') {
                files = await File.find({user: req.user.id, parent: {$ne: null}, type: {$ne: 'folder'}, deleted: null }).sort({date: -1}).limit(50)
                return res.json({files})
            }

            if (category === 'shared') {
                files = await File.find({user: req.user.id, accessLink: {$ne: null}, parent: {$ne: null}, deleted: null })
                return res.json({files})
            }

            if (category === 'trash') {
                const root = await File.findOne({user: req.user.id, parent: null})

                if (root._id == parent) {
                    const rootTrash = await getRootTrash(req.user.id)
                    return res.json({files: rootTrash, path: [root]})
                }

                let parentFile = null
                const tempParent = await File.findOne({user: req.user.id, _id: parent})
                if (tempParent.deleted) parentFile = tempParent

                files = await File.find({user: req.user.id, deleted: {$ne: null}, parent})
                return res.json({files, path: [parentFile]})
            }

            files = await File.find({user: req.user.id, parent, deleted: null})
            const path = await getPath(parent, req.user.id)
            // const path = []
            return res.json({path, files})
        } catch (error) {
            console.log(error)
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
            console.log(error)
            return res.status(500).json({error: 'Can`t rename file/folder'})
        }
    }

    async deleteFilesToTrash(req, res) {
        try {
            const {files} = req.body
            const parent = files[0].parent

            const root = await File.findOne({user: req.user.id, parent: null})

            // для 1 уровня вложенности изменить родителя на root
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                const fileDB = await File.findOne({_id: file._id})
                fileDB.parent = root._id
                await fileDB.save()
            }

            const {countDeleted, sizeDeleted} = await recursiveMarkDeleteFiles(files)
            await recursiveUpdateSizeParent(req.user.id, parent, -sizeDeleted)
            // const dirFiles = await File.find({user: req.user.id, parent, deleted: null})
            return res.json({count: countDeleted})
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'Can`t delete files'})
        }
    }

    async permanentDeleteFiles(req, res) {
        try {
            const {files} = req.body

            const user = await User.findOne({user: req.user.id})
            if (!user) {
                return res.status(500).json({error: 'Delete error'})
            }

            const {count, size} = await recursiveDeleteFiles(files)
            user.usedSpace -= size
            await user.save()
            return res.json({count, size, usedSpace: user.usedSpace})
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'Can`t delete files'})
        }
    }

    async uploadFile(req, res) {
        try {
            const {file} = req.files
            const {fileName} = req.body
            const fileExist = await File.findOne({user: req.user.id, parent: req.body.parent, name: fileName, type: 'file', deleted: null})
            
            if (fileExist) {
                return res.status(400).json({message: 'Файл с таким именем уже существует в данной папке'})
            }

            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})

            if (!parent) {
                return res.status(400).json({message: 'Неверная дирректория'})
            }

            const user = await User.findOne({user: req.user.id})
            if (!user) {
                return res.status(500).json({error: 'Upload error'})
            }

            // if (user.usedSpace + file.size > 999999999) {
            //     return res.status(400).json({message: 'Нет места на облачном диске'})
            // }

            const dbFile = new File({
                name: fileName,
                type: 'file',
                size: file.size,
                parent: parent._id,
                user: req.user.id
            })

            user.usedSpace += dbFile.size
            await user.save()

            await FileService.uploadFile(file, dbFile)
            await dbFile.save()
            await recursiveUpdateSizeParent(req.user.id, dbFile.parent, dbFile.size)

            return res.json({file: dbFile, usedSpace: user.usedSpace})
        } catch (error) {
            console.log(error)
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
                const dbFileExist = await File.findOne({ name: dbFile.name, type: dbFile.type, user: req.user.id, parent: idNewParent })

                if (dbFileExist) {
                    return res.status(400).json({error: `Файл с именем ${dbFileExist.name} уже существует в дирректории для перемещения`})
                }

                sizeToParent += dbFile.size
                dbFile.parent = idNewParent
                await dbFile.save()
            }

            await recursiveUpdateSizeParent(req.user.id, idNewParent, sizeToParent)

            const dirFiles = await File.find({user: req.user.id, parent: curDir, deleted: null })
            return res.json({files: dirFiles})
        } catch (error) {
            console.log(error)
            return res.status(500).json({error: 'Can`t delete files'})
        }
    }

    async getTree(req, res) {
        try {
            const root = await File.findOne({user: req.user.id, parent: null})
            const tree = await recursiveGetTree(req.user.id, root)
            
            return res.json({tree})
        } catch (error) {
            console.log(error)
        }
    }

    async restoreFiles(req, res) {
        try {
            const {files, target} = req.body

            const targetExist = await File.findOne({user: req.user.id, _id: target})
            if (!targetExist) {
                return res.status(400).json({message: 'Папка назначения не существует'})
            }

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileDB = await File.findOne({user: req.user.id, _id: file})
                const fileExist = await File.findOne({user: req.user.id, _id: {$ne: fileDB._id}, name: fileDB.name, type: fileDB.type, parent: target})

                if (fileExist) {
                    return res.status(400).json({message: `В папке назначения уже есть файл/папка с именем - ${fileDB.name}`})
                }

                fileDB.parent = targetExist._id
                await fileDB.save()
            }

            const size = await recursiveRestoreFiles(files)
            await recursiveUpdateSizeParent(req.user.id, targetExist._id, size)

            return res.json({status: 'ok'})
        } catch (error) {
            console.log(error)
        }
    }

    async searchFiles(req, res) {
        try {
            const { fileName } = req.query
            const allFiles = await File.find({user: req.user.id, deleted: null})
            const files = allFiles.filter(file => file.name.toLowerCase().includes(fileName.toLowerCase()))
            const root = await File.findOne({user: req.user.id, parent: null})
            const parents = new Map()

            let filesWithParentsName = []
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileParent = file.parent.toString()
                if (parents.has(fileParent)) {
                    const parentName = parents.get(fileParent)
                    filesWithParentsName.push({
                        _id: file._id,
                        name: file.name,
                        parent: file.parent,
                        type: file.type,
                        date: file.date,
                        size: file.size,
                        parentName})
                    continue
                }

                const parent = await File.findOne({user: req.user.id, _id: file.parent})
                
                if (fileParent == root._id.toString()) {
                    parents.set(fileParent, "Главная")
                    filesWithParentsName.push({
                        _id: file._id,
                        name: file.name,
                        parent: file.parent,
                        type: file.type,
                        date: file.date,
                        size: file.size,
                        parentName: "Главная"})
                    continue
                }

                parents.set(fileParent, parent.name)
                filesWithParentsName.push({
                    _id: file._id,
                    name: file.name,
                    parent: file.parent,
                    type: file.type, 
                    date: file.date,
                    size: file.size,
                    parentName: parent.name})
            }

            return res.json({files: filesWithParentsName})
        } catch (error) {
            console.log(error)
        }
    }

    async toggleShareFile(req, res) {
        try {
            const { fileID } = req.body
            const fileDB = await File.findOne({user: req.user.id, _id: fileID})
            const userDB = await User.findOne({_id: req.user.id})
            const hashAccessLink = await bcrypt.hash(fileDB.name + Date().toString() + userDB.email, 5)
            fileDB.accessLink = fileDB.accessLink ? null : hashAccessLink.replace(/[^a-zA-Z0-9]/g, "")
            await fileDB.save()

            return res.json({link: fileDB.accessLink})
        } catch (e) {
            console.log(e)
        }
    }

    async getShareInfoFile(req, res) {
        try {
            const { fileID } = req.query
            const fileDB = await File.findOne({user: req.user.id, _id: fileID})
            return res.json({link: fileDB.accessLink})
        } catch (e) {
            console.log(e)
        }
    }

    async getShare(req, res) {
        try {
            const { accessLink } = req.query
            const fileDB = await File.findOne({accessLink, deleted: null})
            if (!fileDB) {
                return res.status(404).json({message: `Файл не найден`})
            }

            const files = fileDB.type === "file" ? [fileDB] : await File.find({parent: fileDB._id})
            return res.json({files})
        } catch (e) {
            console.log(e)
        }
    }

    async downloadFiles(req, res) {
        try {
            const { files } = req.body
            if (!files.length) {
                return res.status(400).json({message: `Не выбраны файлы для скачивания`})
            }

            const date = new Date()
            let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
            let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
            let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
            let fileName = `mCloud_(${da}-${mo}-${ye}).zip`

            if (files.length === 1) {
                const fileDB = await File.findOne({_id: files[0]._id})
                if (fileDB.type === "file") {
                    return res.download(FileService.getFilePath(fileDB.user, fileDB._id), fileDB.name)
                }

                fileName = fileDB.name + ".zip"
            }

            
            let zip = new JSZip()
            zip = await recursiveZipFiles(zip, "/", files)
            zip.generateAsync({ type: 'nodebuffer' }).then(buffer => {
                res.setHeader('Content-Type', 'application/octet-stream')
                res.setHeader('Content-Disposition', 'attachment; filename="' + fileName + '"')
                res.end(buffer)
            })
        } catch (e) {
            console.log(e)
        }
    }

    async copyFiles(req, res) {
        try {
            const { parent, files } = req.body

            if (!files.length) {
                return res.status(400).json({message: `Не выбраны файлы для копирования`})
            }

            const size = await recursiveCopyFiles(parent, files, req.user.id)
            await recursiveUpdateSizeParent(req.user.id, parent, size)

            let user = await User.findOne({_id: req.user.id})
            user.usedSpace += size
            await user.save()

            const updatedParentFiles = await File.find({parent})
            return res.json({files: updatedParentFiles, usedSpace: user.usedSpace})
        } catch (e) {
            console.log(e)
            return res.status(400).json({error: `Ошибка при копировании`})
        }
        
    }
}

module.exports = new FileController()