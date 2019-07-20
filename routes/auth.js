const express = require('express');
const bcrypt = require('bcrypt');//암호화모듈
const passport = require('passport');
const {User} = require('../models');

const router = express.Router();
//POST/auth/join
router.post('/join', async (req,res,next)=>{ //promise async
    const {email,nick,password} = req.body;
    try{
        const exUser = await User.find({where: {email}});   //비동기로 처리될 부분에 await
        if(exUser){
            req.flash('joinError','이미 가입된 이메일입니다.');
            return res.redirect('/join');
        } 
        console.time('암호화 시간')
        const hash = await bcrypt.hash(password,12);//여기서 이 숫자를 조절해 1초정도로 맞추자. 너무낮으면 해커들이 뚫기 쉽고 너무 높으면 오래걸린다.(적당한숫자로하자.)
        console.timeEnd('암호화 시간');
        await User.create({
            email,
            nick,
            password: hash,
        });
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/login',(req,res,next)=>{ //req.body.email  req.body.password
    passport.authenticate('local',(authError,user,info)=>{
    if(authError){
        console.error(authError);
        return next(authError);
    }
    if(!user){
        req.flash('loginError',info.message);
        return res.redirect('/');
    }
    return req.login(user,(loginError)=>{ //req.user
        if(loginError){
            console.error(loginError);
            return next(loginError);
        }
        return res.redirect('/');
    });
    })(req,res,next);
});


router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout();
    req.session.destroy(); //req.user
    res.redirect('/');
})
module.exports = router;