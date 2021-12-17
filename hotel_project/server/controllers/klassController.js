const{Klass, Type} = require('../models/models')
const ApiError = require('../error/ApiError');
const {parse} = require("json2csv");

class KlassController{
    async create (req, res) {
        const {name} = req.body
        const klass = await Klass.create({name})
        return res.json(klass)
    }
    async getAll (req, res) {
        const klasses = await Klass.findAll()
        return res.json(klasses)
    }
    async getCSV (req, res) {
        const klasses = await Klass.findAll();

        const {parse} = require('json2csv');

        const fields = ['id', 'name', 'createdAt', 'updatedAt'];
        const opts = {fields};

        try {
            const csv = parse(klasses, opts);

            console.log(csv);
            res.attachment('Klass.csv');
            return res.status(200).send(csv);
        } catch (err) {
            console.error(err);
        }
    }
}
module.exports = new KlassController()