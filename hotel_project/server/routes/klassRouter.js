const Router = require('express')
const router = new Router()
const klassController = require('../controllers/klassController')
const checkRole = require("../middleware/checkRoleMiddleware");
const typeController = require("../controllers/typeController");

router.post('/', checkRole('ADMIN'), klassController.create)
router.get('/',klassController.getAll)
router.get('/csv', klassController.getCSV)
router.delete('/',)

module.exports = router