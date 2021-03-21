const {DataTypes} = require('sequelize');
const sequalize = require('../util/database');

const ProfessionName = sequalize.define('profession_name',{
    name: DataTypes.STRING
}, {
    timestamps:false
});

ProfessionName.addScope('findByName',(name)=>{
    return {
        where: {
                name : name
            }
    }
})

module.exports = ProfessionName;