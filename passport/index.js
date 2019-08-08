const local = require('../passport/localStrategy');
const kakao = require('../passport/kakaoStrategy');
const {User} = require('../models');


module.exports = (passport)=>{
    passport.serializeUser((user, done)=>{

        done(null, user.id); //모든 정보가 세션에 들어가면 무거워지므로 user.id만 넣어준다.
    });
    //메모리에 한번만 저장

    passport.deserializeUser((id,done)=>{
            User.findOne({
                where : {id},
                include: [{
                    model:User,
                    attributes:['id','nick'],
                    as: 'Followers',
                },{
                    model : User,
                    attributes : ['id', 'nick'],
                    as:'Followings',
                }],
            })
            .then(user => done(null,user))
            .catch(err => done(err));
    });
    //요청 갈 때마다 매번 호출
    
    local(passport);
    kakao(passport);
};