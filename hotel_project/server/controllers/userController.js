const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const{User, Basket} = require('../models/models')

//функция для генерирования токена
const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration(req, res, next){
        const {login, password, role} = req.body
        if(!login || !password) {
            return next(ApiError.badRequest('Неккоректный login или password'))
        }
        const candidate = await User.findOne({where: {login}})
        if(candidate) {
            return next(ApiError.badRequest('Пользователь с таким login уже существует'))
        }
        if(password.length<6){
            return next(ApiError.badRequest('Password меньше 6 символов, попробуйте еще раз'))
        }
        if(password.length>20){
            return next(ApiError.badRequest('Password превышает 20 символов, попробуйте еще раз'))
        }
            const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, role, password: hashPassword})
        const basket = await Basket.create({userId:user.id})
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
    }

    async login (req, res, next){
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        //с помощью ф-ции compareSync сравниваем пароли
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
    }
    async check(req, res, next){
        //res.json({message: "ALL RIGHT"})
        const token = generateJwt(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }
}
module.exports = new UserController()