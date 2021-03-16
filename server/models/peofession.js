const sequalize = require('../util/database');
const {DataTypes} = require('sequelize');

const Profession = sequalize.define('profession',{
    professionId:{
        type: DataTypes.INTEGER,
        allowNull:true,
        get(){
            const id = this.getDataValue(professionId);
            return id ? id : null
        }
    }
}, {
    timestamps:false
});

module.exports = Profession;