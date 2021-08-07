module.exports = (sequelize,DataTypes)=>(
    sequelize.define('hashtag',{
        title:{ 
            type:DataTypes.STRING(15),
            allowNull:false,
            unique:true,
        }
    },{ 
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps:true,
        paranoid:true,
    }) 
);