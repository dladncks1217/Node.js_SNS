module.exports = (sequelize,DataTypes)=>(
    seqeulize.define('posts',{
        content:{
            type:DataTypes.STRING(140),
            allowNull: false,
        },
        img:{
            type:DataTypes.STRING(200),
            allowNull:true,
        },
    },{
        timestamps:true,
        paranoid:true, 
    })
);