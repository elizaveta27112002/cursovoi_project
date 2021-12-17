const{Type} = require('../models/models')
const ApiError = require('../error/ApiError');

class TypeController{
    async create (req, res) {
        const {name} = req.body
        if(!name) {
            return next(ApiError.badRequest('Введите текст'))
        }
        const type = await Type.create({name})
        return res.json(type)
    }
    async getAll (req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
    async getCSV (req, res) {
        const types = await Type.findAll();

        const {parse} = require('json2csv');

        const fields = ['id', 'name', 'createdAt', 'updatedAt'];
        const opts = {fields};

        try {
            const csv = parse(types, opts);

            console.log(csv);
            res.attachment('Type.csv');
            return res.status(200).send(csv);
        } catch (err) {
            console.error(err);
        }
    }
}
module.exports = new TypeController()