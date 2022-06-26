const Router = require("express")
const router = new Router()
const authMiddleware = require("../middleware/auth.middleware")
const FileController = require("../controllers/fileController")

router.post('/dir/create', authMiddleware, FileController.createDir)
router.get('', authMiddleware, FileController.getFiles)

module.exports = router