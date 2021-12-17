const Router = require('express')
const router = new Router()
const roomController = require('../controllers/roomController')
const checkRole = require('../middleware/checkRoleMiddleware')
const typeController = require("../controllers/typeController");

router.post('/', checkRole('ADMIN'), roomController.create)
router.get('/',roomController.getAll)
router.get('/:id', roomController.getOne)
router.delete('/',)

module.exports = router