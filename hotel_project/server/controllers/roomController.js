const{Room, RoomInfo, Type} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')
const {parse} = require("json2csv");

class RoomController{
    async create (req, res, next) {
        try{
            let {name, price, klassId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const room = await Room.create({name, price, klassId, typeId, img: fileName});

            if(info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    RoomInfo.create({
                        title: i.title,
                        description: i.description,
                        roomId: room.id
                    })
                )
            }

            return res.json(room)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll (req, res) {
        let {klassId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let rooms;
        //если нет класса и типа
        if (!klassId && !typeId) {
            rooms = await Room.findAndCountAll({limit, offset})
        }
        //если нет типа
        if (klassId && !typeId) {
            rooms = await Room.findAndCountAll({where: {klassId}, limit, offset})
        }
        //если нет класса
        if (!klassId && typeId) {
            rooms = await Room.findAndCountAll({where: {typeId}, limit, offset})
        }
        //если и класс, и тип
        if (klassId && typeId) {
            rooms = await Room.findAndCountAll({where: {typeId, klassId}, limit, offset})
        }
        return res.json(rooms)
    }
    async getOne (req, res) {
        const {id} = req.params
        const room = await Room.findOne(
            {
                where: {id},
                include: [{model: RoomInfo, as: 'info'}]
            },
        )
        return res.json(room)
    }
}
module.exports = new RoomController()