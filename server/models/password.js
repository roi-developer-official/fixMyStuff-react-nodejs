const {DataTypes} = require('sequelize');
const sequalize = require('../util/database');
const bcrypt = require('bcrypt');


const Password = sequalize.define('password',{
    value:{
        type: DataTypes.STRING,
        allowNull:false,
        get(){
            const rawValue = this.getDataValue(value);
            return rawValue ? rawValue : null
        },
        async set(value){
            const hash = await bcrypt.hash(value,10);
            this.setDataValue('value', hash);
        }
    },
}, {
    timestamps:false
});

module.exports = Password;