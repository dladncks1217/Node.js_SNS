module.exports = (sequelize,DataTypes)=>(
    sequelize.define('user',{
        email:{
            type: DataTypes.STRING(40),
            allowNull: true,
            unique:true,
        },
        nick:{
            type:DataTypes.STRING(15),
            allowNull: false,
        },
        password:{ 
            type:DataTypes.STRING(100),
            allowNull:true,
        },
        provider:{
            type:DataTypes.STRING(10),
            allowNull:true,
            defaultValue:'local',
        }, 
        snsId:{
            type:DataTypes.STRING(30),
            allowNull:true,
        },
    },{
        charset: 'utf8',
        collate: 'utf8_general_ci', 
        timestamps:true, //시퀄라이즈가 자동으로 수정일과 row 생성일을 기록해줍니다.
        paranoid:true, //삭제일을 시퀄라이즈가 자동으로 기록해준다.(데이터 복구가능)
    })
);