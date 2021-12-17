const{Dop, Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class DopController{
    async create (req, res) {
        const {name, price} = req.body
        const dop = await Dop.create({name, price})
        return res.json(dop)
    }
    async getAll (req, res) {
        const dopes = await Type.findAll()
        return res.json(dopes)
    }

}
module.exports = new DopController()