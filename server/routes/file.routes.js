const Router = require("express")
const router = new Router()
const authMiddleware = require("../middleware/auth.middleware")
const FileController = require("../controllers/fileController")

router.post('/dir/create', authMiddleware, FileController.createDir)
router.post('/rename', authMiddleware, FileController.renameFile)
router.post('/delete', authMiddleware, FileController.deleteFiles)
router.post('/upload', authMiddleware, FileController.uploadFile)
router.post('/move', authMiddleware, FileController.changeParent)

router.get('', authMiddleware, FileController.getFiles)

module.exports = router