const KakaoStrategy = require('passport-kakao').Strategy;

const {User} = require('../models');

module.exports = (passport)=>{
    passport.use(new KakaoStrategy({
        clientID:process.env.KAKAO_ID,
        callbackURL:'/auth/kakao/callback',
    },async(accessToken,refreshToken,profile,done)=>{
        try{
        const exUser = await User.find({ //기존에 카카오로 가입한 유저찾기
            where:{ 
                snsId: profile.id,
                provider: 'kakao',
            },
        })
        if(exUser){
            done(null,exUser); //done 하면 req.user에 exUser가 저장된다.
        } else{
            console.log(profile);
            const newUser = await User.create({
                email: profile._json && profile.kaccount_email, //카카오가만들어주는것
                nick: profile.displayName,
                snsId: profile.id, //위 함수인자의 profile(카카오에서 준거)
                provider: 'kakao', //이 snsId가 어떤회사의 snsId인지 구분하기위해 넣는다.
            });
            done(null,newUser); 
        }
    }catch(error){
        console.error(error);
        done(error);
    }
    }))
}