const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING,defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketRoom = sequelize.define('basket_room', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

})
const Room = sequelize.define('room', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.STRING,allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},

})
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Klass = sequelize.define('klass', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Dop = sequelize.define('dop', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.STRING, allowNull: false},
})

const RoomInfo = sequelize.define('room_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

//связующая таблица для связи многие ко многим
const TypeKlass = sequelize.define('type_klass',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketRoom)
BasketRoom.belongsTo(Basket)

Type.hasMany(Room)
Room.belongsTo(Type)

Klass.hasMany(Room)
Room.belongsTo(Klass)

Room.hasMany(BasketRoom)
BasketRoom.belongsTo(Room)

Room.hasMany(RoomInfo, {as: 'info'});
RoomInfo.belongsTo(Room)

Type.belongsToMany(Klass, {through: TypeKlass})
Klass.belongsToMany(Type, {through: TypeKlass})

module.exports = {
    User,
    Room,
    BasketRoom,
    Basket,
    Dop,
    Klass,
    Type,
    RoomInfo,
    TypeKlass
}