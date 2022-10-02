const Router = require("express")
const router = new Router()
const authMiddleware = require("../middleware/auth.middleware")
const FileController = require("../controllers/fileController")

router.post('/dir/create', authMiddleware, FileController.createDir)
router.post('/rename', authMiddleware, FileController.renameFile)
router.post('/delete', authMiddleware, FileController.deleteFilesToTrash)
router.post('/permanentDelete', authMiddleware, FileController.permanentDeleteFiles)
router.post('/upload', authMiddleware, FileController.uploadFile)
router.post('/move', authMiddleware, FileController.changeParent)
router.post('/restore', authMiddleware, FileController.restoreFiles)

router.post('/share', authMiddleware, FileController.toggleShareFile)
router.get('/shareInfo', authMiddleware, FileController.getShareInfoFile)
router.get('/getShare', FileController.getShare)

router.get('', authMiddleware, FileController.getFiles)
router.get('/search', authMiddleware, FileController.searchFiles)
router.get('/tree', authMiddleware, FileController.getTree)

router.post('/download', FileController.downloadFiles)

module.exports = router