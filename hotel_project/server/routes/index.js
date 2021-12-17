const Router = require('express')
const router = new Router()
const roomRouter = require('./roomRouter')
const userRouter = require('./userRouter')
const dopRouter = require('./dopRouter')
const typeRouter = require('./typeRouter')
const klassRouter = require('./klassRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/klass', klassRouter)
router.use('/room', roomRouter)
//router.use('/dop', dopRouter)

module.exports = router