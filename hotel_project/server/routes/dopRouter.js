const Router = require('express')
const router = new Router()
const dopController = require('../controllers/dopController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), dopController.create)
router.get('/',dopController.getAll)
router.delete('/',)

module.exports = router